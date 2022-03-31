const getCityFromLocation = async (latitude, longitude) => {
    const result = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(res => res.json());
    return result.locality;
}

export {
    getCityFromLocation
}