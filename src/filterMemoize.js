const filterMemoize = () => {
  let cache = {};

  return (arr, status) => {
    if (cache.arr === arr && cache.status === status) {
      return cache.result;
    }

    let result;

    switch (status) {
      default:
      case 'all': result = arr; break;
      case 'active': result = arr.filter(item => !item.isChecked); break;
      case 'completed': result = arr.filter(item => item.isChecked);
    }

    cache = {
      arr,
      status,
      result,
    };

    return result;
  };
}

export const visibleList = filterMemoize();
