export function isValidRoute(to, from, next) {
  if (to.params.name !== 'falafel' && to.params.name !== 'meatball') {
    next('/not-found');
  } else {
    next();
  }
}

export function isValidSideRoute(to, from, next) {
  if (to.params.name !== 'pita' && to.params.name !== 'salad' && to.params.name !== 'drink') {
    next('/not-found');
  } else {
    next();
  }
}