const composeClassNames = (...classNames: Array<string | undefined | false | null>) =>
  classNames.filter(Boolean).join(' ');

export { composeClassNames };
