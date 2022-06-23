import { Oval } from 'react-loader-spinner';
import React from 'react';

type OwnProps = {
  className?: string;
};
function Loader({
  className
}: OwnProps) {
  return (
    <Oval
      wrapperClass={className}
      height={32}
      width={32}
      strokeWidth={2}
      color="var(--color-text-secondary)"
      secondaryColor="transparent"
    />
  );
}

export default Loader;
