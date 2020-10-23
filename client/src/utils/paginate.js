import _ from "lodash";
function paginate(items, pageIndex, pageSize) {
  const start = (pageIndex - 1) * pageSize;
  return _(items).slice(start).take(pageSize).value();
}

export default paginate;
