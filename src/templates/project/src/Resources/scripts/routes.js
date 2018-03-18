/**
 * Check if Path is Current Route
 * @param  {string} path defined by react-router
 * @return {Boolean}
 */
export default ( path ) => '/' + window.location.pathname.split('/')[1] === path
