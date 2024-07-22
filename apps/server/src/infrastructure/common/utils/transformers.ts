export const isProgrammingFile = (filename: string): boolean => {
  const programmingExtensions = [
    '.js',
    '.ts',
    '.jsx',
    '.tsx',
    '.py',
    '.java',
    '.c',
    '.cpp',
    '.cs',
    '.go',
    '.rb',
    '.php',
    '.swift',
    '.kt',
    '.rs',
    '.scala',
    '.m',
    '.h',
    '.sh',
    '.pl',
    '.r',
    '.lua',
    '.dart',
    '.f',
    '.f90',
    '.jl',
  ];
  return programmingExtensions.some((ext) =>
    filename.toLowerCase().endsWith(ext),
  );
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
