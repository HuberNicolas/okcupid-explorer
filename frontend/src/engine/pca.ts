/** Eigenvalues and eigenvectors (columns) of a symmetric matrix with the cyclic Jacobi method. */
export function symmetricEigen(matrix: number[][]): { values: number[]; vectors: number[][] } {
  const n = matrix.length;
  const a = matrix.map((row) => [...row]);
  const v = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));

  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p][q] ** 2;
    if (off < 1e-22) break;

    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue;
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k++) {
          const akp = a[k][p];
          const akq = a[k][q];
          a[k][p] = c * akp - s * akq;
          a[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = a[p][k];
          const aqk = a[q][k];
          a[p][k] = c * apk - s * aqk;
          a[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < n; k++) {
          const vkp = v[k][p];
          const vkq = v[k][q];
          v[k][p] = c * vkp - s * vkq;
          v[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  return { values: a.map((row, i) => row[i]), vectors: v };
}

export interface PcaResult {
  /** Projected rows, one array of `components` numbers per input row */
  scores: number[][];
  /** Share of the total variance per component */
  explained: number[];
}

/**
 * PCA like scikit-learn's "covariance_eigh" solver: eigenvectors of the covariance matrix,
 * largest first, each flipped so that its largest absolute entry is positive.
 */
export function pca(data: number[][], components: number): PcaResult {
  const n = data.length;
  const d = data[0].length;
  const mean = Array.from({ length: d }, (_, j) => data.reduce((sum, row) => sum + row[j], 0) / n);
  const centered = data.map((row) => row.map((x, j) => x - mean[j]));

  const cov = Array.from({ length: d }, () => new Array<number>(d).fill(0));
  for (const row of centered) {
    for (let i = 0; i < d; i++) {
      if (row[i] === 0) continue;
      for (let j = i; j < d; j++) cov[i][j] += row[i] * row[j];
    }
  }
  for (let i = 0; i < d; i++) {
    for (let j = i; j < d; j++) {
      cov[i][j] /= n - 1;
      cov[j][i] = cov[i][j];
    }
  }

  const { values, vectors } = symmetricEigen(cov);
  const order = values.map((value, i) => [value, i] as const).sort((a, b) => b[0] - a[0]);
  const total = values.reduce((sum, value) => sum + Math.max(value, 0), 0);

  const axes = order.slice(0, components).map(([, i]) => {
    const axis = vectors.map((row) => row[i]);
    const largest = axis.reduce((best, x) => (Math.abs(x) > Math.abs(best) ? x : best), 0);
    return largest < 0 ? axis.map((x) => -x) : axis;
  });

  return {
    scores: centered.map((row) => axes.map((axis) => row.reduce((sum, x, j) => sum + x * axis[j], 0))),
    explained: order.slice(0, components).map(([value]) => value / total),
  };
}
