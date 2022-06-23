import React, { useState } from 'react';
import { useQuery } from 'react-query'
import Quote from './types/Quote'
import MyCard from './components/MyCard'
import { getRandomInt } from './utils'

const  App: React.FC = () => {
	const [quotes, setQuotes] = useState<Array<Quote>>([]) //to store the fetched list of quotes
	const [quote, updateQuote] = useState<Quote | null>(null) //to store the selected quote
	
	//fetch the list of quotes
	const { isFetching, error } = useQuery<Array<Quote>, Error>('quote', async () => {
	  	try{
		  	const response = await fetch('https://type.fit/api/quotes')
		  	const data = await response.json()
		  	setQuotes(data)
		  	updateQuote(data[getRandomInt(0, data.length - 1)])
			return data
		}
		catch(err) {
			console.log(err)
			throw err
		}
	  }, {
	  	retry: 2, //retry at most 2 times if the query fails
	})
  
  //fetch the random image, no need to store it in a state
  const { data: dataImg, isFetching: isFetchingImg, error: errorImg, refetch: updateImg } = useQuery<string | undefined, Error>('img', async () => {
  	try{
	  	const response = await fetch('https://source.unsplash.com/random/1000x1000/?nature&animal')
	  	const imageBlob = await response.blob()
    	return URL.createObjectURL(imageBlob)
    }
    catch(err) {
    	console.log(err)
    	throw err
    }
  }, {
  	retry: 2, //retry at most 2 times if the query fails
  })
  
  //this function refetchs a new random image from api and selects a random quote from the stored list
  const doUpdate: () => void = () => {
  	updateImg(); //refetch a new random image
    updateQuote(quotes[getRandomInt(0, quotes.length - 1)]); //select a random quote from the stored list
  }
  
  //show a spinner if any of the two api is fetching, else show a Card with results
  if(isFetching || isFetchingImg) {
  	return (
  		<MyCard fetching={true}  />
  	)
  }
  
  //if any fetching error
  if(error && errorImg) {
  	return (
  		<MyCard error={true}  />
  	)
  }
  
  //show the Card component with the fetched data
  return ( <MyCard imgURL={dataImg} quoteText={quote?.text} quoteAuthor={quote?.author} doUpdate={doUpdate} /> )
}

export default App
