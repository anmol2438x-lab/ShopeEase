
// for currnent date + day
const getDate = (day) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + day)

  return currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default getDate;


