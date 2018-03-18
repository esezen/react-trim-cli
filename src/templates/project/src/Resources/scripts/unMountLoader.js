/**
 * Remove Splash Page Loader
 * @return {void} Animate Before Removal
 */
const unMountLoader = () => {
	const loader = document.getElementById('loader')

	loader.className = 'unmount'
	setTimeout(() => document.body.removeChild(loader), 1000)
}

export default unMountLoader
