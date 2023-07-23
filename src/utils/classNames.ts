type ClassNames = Record<string, boolean>;

export const classNames = (classes: ClassNames): string => {
  let resultClassNames = "";

  Object.entries(classes).forEach(([key, value]) => {
    if (value) {
      resultClassNames += resultClassNames ? ` ${key}` : `${key}`;
    }
  });

  return resultClassNames;
};
