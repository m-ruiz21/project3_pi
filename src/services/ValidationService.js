/**
 * Determines if valid route
 * 
 * @param to target route that will be checked
 * @param from previous route (in case of redirect)
 * @param next function to define next route.
 * 
 */
export function isValidRoute(to, from, next) {
  if (to.params.name !== 'falafel' && to.params.name !== 'meatball') {
    next('/not-found');
  } else {
    next();
  }
}

/**
 * Determines if valid side route
 * 
 * @param to target route that will be checked
 * @param from previous route (in case of redirect)
 * @param next function to define next route.
 * 
 */
export function isValidSideRoute(to, from, next) {
  if (to.params.name !== 'pita' && to.params.name !== 'salad' && to.params.name !== 'drink') {
    next('/not-found');
  } else {
    next();
  }
}