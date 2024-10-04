import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getJoke() {
		return `/random_joke`
	},
}

const hooks = {
	useJoke() {
		return useSWR(url.getJoke(), http.fetcher)
	}
}

const api = {

}

export const sampleRepository = {
	url, hooks, api
}
