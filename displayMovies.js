import { LightningElement, track, wire } from 'lwc';
import getRating from '@salesforce/apex/ImdbMovies.getRating'
export default class DisplayMovies extends LightningElement {

    @track input = '';
    @track movies;

    @wire(getRating, { movie: '$input' })
    handleData(result) {
        //console.log('Wire service result:', result); // Debug: Log the wire service result

        if (result.data) {
            try {
                let data = JSON.parse(result.data);
                this.movies = data.result; // Correct assignment
                console.log(this.movies.Title)
            } catch (error) {
                //console.error('Error parsing data:', error);
            }
        } else if (result.error) {
            //console.error('Wire service error:', result.error); // Debug: Log the wire service error
        }
    }

    nameHandler(event) {
        this.input = event.target.value;
    }
}