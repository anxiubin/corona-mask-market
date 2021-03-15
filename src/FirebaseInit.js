import firebase from "firebase/app"
import "firebase/analytics"
import dotenv from "dotenv"

dotenv.config()

const FIREBASE_APIKEY = process.env.REACT_APP_FIREBASE_API_KEY

let firebaseConfig = {
	apiKey: FIREBASE_APIKEY,
	authDomain: "corona-mask-market-300fc.firebaseapp.com",
	databaseURL: "https://corona-mask-market-300fc.firebaseio.com",
	projectId: "corona-mask-market-300fc",
	storageBucket: "corona-mask-market-300fc.appspot.com",
	messagingSenderId: "177350093246",
	appId: "1:177350093246:web:8cd93da6bc0e15832931ef",
	measurementId: "G-69YYFZ3RYB",
}

export const fire = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig)
		firebase.analytics()
	} else {
		firebase.app()
		firebase.analytics()
	}
}
