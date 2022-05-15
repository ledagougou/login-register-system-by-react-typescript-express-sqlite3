export function getQueryStringByName(name: string): string {
  var result = window.location.search.match(
    new RegExp("[?&]" + name + "=([^&]+)", "i")
  );
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}