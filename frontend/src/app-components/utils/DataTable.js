export const filterToBool = (item, filter, keys) => {
  let res = true;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].length === 1) {
      res = res && item[keys[i][0]] === filter[keys[i][0]];
      //
      /*console.log(
          keys[i].join("."),
          " : ",
          item[keys[i][0]],
          filter[keys[i][0]]
        );*/
    } else if (keys[i].length === 2) {
      res = res && item[keys[i][0]][keys[i][1]] === filter[keys[i][1]];
      //
      /*console.log(
          keys[i].join("."),
          " : ",
          item[keys[i][0]][keys[i][1]],
          filter[keys[i][1]]
        );*/
    }
    //console.log(keys[i]);
  }
  return res;
};

export const filterDataProcess = (filter) => {
  let keys = Object.keys({ ...filter });
  let newkeys = [
    ...keys.map((item) => {
      if (item.includes("#")) {
        //const temp = item.split("#");
        //temp[temp.length - 1]
        return item.split("#");
      } else {
        return [item];
      }
    }),
  ];

  let newFilter = {};
  for (var i = 0; i < keys.length; i++) {
    if (newkeys[i].length === 1) {
      newFilter[newkeys[i][0]] = filter[keys[i]];
    } else if (newkeys[i].length === 2) {
      newFilter[newkeys[i][1]] = filter[keys[i]];
    }
  }
  console.log(newFilter, newkeys);
  //console.log(filter, keys);
  return [newFilter, newkeys];
};

export const PaginateData = (data, rows) => {
  let counter = 0;
  let page = 1;
  let paginated = [];
  for (var i = 0; i < data.length; i++) {
    if (counter < rows) {
      counter += 1;
      paginated.push({ ...data[i], page });
    } else {
      counter = 1;
      page += 1;
      paginated.push({ ...data[i], page });
    }
  }
  //console.log(paginated);
  return [page, paginated];
};
