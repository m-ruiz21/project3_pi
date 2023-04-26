export function isValidRoute(to, from, next) {
  if (to.params.name !== 'falafel' && to.params.name !== 'meatball') {
    next('/not-found');
  } else {
    next();
  }
}