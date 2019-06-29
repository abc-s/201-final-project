export function listItem(children) {
  const liElement = document.createElement('li');
  liElement.innerHTML = children;
  return liElement;
}
