type DetailsLoadingProps<T> = {
  children: T;
};

function DetailsLoading<T>({ children }: DetailsLoadingProps<T>): JSX.Element {
  return <>{children}</>;
}

export default DetailsLoading;
