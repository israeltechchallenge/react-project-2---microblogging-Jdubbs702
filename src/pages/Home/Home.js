import './Home.css'
import { useState, useEffect } from "react";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import TweetList from "../../components/TweetList/TweetList";
import { TweetsContext } from '../../contexts/TweetsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../config/FirebaseController';
import { addDoc, collection, getDocs, query, orderBy, onSnapshot, limit, startAfter } from 'firebase/firestore';
import { Btn } from '../../UIKit'
import useTweets from '../../hooks/useTweets';

const TweetsContainer = () => {
    const tweetsHandler = useTweets();
    return (
        <div className="Home">
            <TweetsContext.Provider value={tweetsHandler}>
                <CreateTweet/>
                <TweetList/>
            </TweetsContext.Provider>
        </div>
    );
}
 
export default TweetsContainer;

// const TweetsContainer = ({ displayName }) => {
//     const [listOfTweets, setListOfTweets] = useState([]);
//     const [isPending, setIsPending] = useState(true);
//     //const [error, setError] = useState(null);
//     const tweetsCollectionRef = collection(db, 'tweets');
//     const [tweetsLimit, setTweetsLimit] = useState(10);
//     const q = query(tweetsCollectionRef, orderBy('date', 'desc'), limit(10));
//     const [lastDoc, setLastDoc] = useState(null);
//     const [isEmpty, setIsEmpty] = useState(false);
    
//     const handleAddTweet = async (content) => {
//         setIsEmpty(false);
//         const newTweet = {
//             content: content,
//             userName: displayName,
//             date: new Date().toISOString()
//         }
//         await addDoc(tweetsCollectionRef, newTweet);
//     }

//     const getTweets = async (query) => {
//         setIsPending(true);
//         const querySnapshot = await getDocs(query);
//         const isCollectionEmpty = querySnapshot.size === 0;
//         if (!isCollectionEmpty) {
//             const tweets = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
//             const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
//             setListOfTweets(tweets);
//             setLastDoc(lastDoc);
//         } else {
//             setIsEmpty(true);
//         }
//         setIsPending(false);
//     }

//     const fetchMore = () => {
//         setTweetsLimit(tweetsLimit + 10)
//         setIsEmpty(false);
//         const nextQ = query(tweetsCollectionRef, orderBy('date', 'desc'), startAfter(lastDoc), limit(tweetsLimit));
//         getTweets(nextQ);
//     }

//     const handleScroll = (e) => {
//         const{scrollTop, clientHeight, scrollHeight} = e.currentTarget;
//         if((scrollHeight - .333343505859375) - scrollTop === clientHeight) {
//             fetchMore();
//         }
//     }

//     useEffect(() => {
//         getTweets(q);
//         const unsubscribe = () => {
//             onSnapshot(q, (snapshot) => setListOfTweets(snapshot.docs.map((doc) => doc.data())));
//         }
//         return unsubscribe();
//     }, [])

//     // useEffect(() => {
//     //     const getTweets = async () => {
//     //         setIsPending(true);
//     //         const querySnapshot = await getDocs(q);
//     //         setTweets(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
//     //         setIsPending(false)
//     //     }

//     //     const updateLocalTweets = async () => {
//     //         const querySnapshot = await getDocs(q);
//     //         if (querySnapshot.docs !== tweets) {
//     //             setIsPending(true)
//     //             setTweets(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
//     //         };
//     //         setIsPending(false)
//     //     }
//     //     getTweets();

//     //     const interval = setInterval(() => {
//     //         updateLocalTweets();
//     //     }, 9000);
//     //     return () => clearInterval(interval);
//     // }, []);

//     return (
//         <div className="Home">
//             <TweetsContext.Provider value={{ handleAddTweet, listOfTweets }}>
//                 <CreateTweet isUser={displayName} />
//                 {listOfTweets && <TweetList onScroll={handleScroll} />}
//                 {isPending && <div style={{ color: '#CCCCCC' }}>Loading...</div>}
//                 {isEmpty && <div style={{ color: '#CCCCCC' }}>Nothing to see here..</div>}
//                 {!isPending && !isEmpty && <Btn onClick={fetchMore}>More</Btn>}
//             </TweetsContext.Provider>
//         </div>
//     );
// }

// export default TweetsContainer;