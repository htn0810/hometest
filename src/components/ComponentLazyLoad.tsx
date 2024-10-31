import { Suspense, lazy } from 'react';
import Loading from './Loading';

const ComponentLazyLoad = (lazyComponent: Promise<any>) => {
  const LazyComponent = lazy(() => lazyComponent);
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default ComponentLazyLoad;
