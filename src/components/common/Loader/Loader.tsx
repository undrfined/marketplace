import { Oval } from 'react-loader-spinner';
import React from 'react';

function Loader() {
  return <Oval height={32} width={32} strokeWidth={2} color="var(--color-text-secondary)" secondaryColor="transparent" />;
}

export default Loader;
