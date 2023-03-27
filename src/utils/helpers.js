export const formatPrice = (number) => {
    const newNumber = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    }).format(number/100)
    return newNumber
}

export const getUniqueValues = () => {}
