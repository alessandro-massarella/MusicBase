// IL TOKEN DELL'API DISCOGS È CONTENUTO NEL FILE API_TOKEN.JS
const discogsAPI = "https://api.discogs.com//database/search";
const trendAPI = "https://api.discogs.com/database/search?sort=hot";
const masterAPI = "https://api.discogs.com/masters/"
const date = new Date();
let day = date.getDay();
let month = date.getMonth();
let year = date.getFullYear();
let today = day + '/' + month + '/' + year; 


new Vue({
    el: '#myApp',
    data: {

        today: today,
        artist: null,
        albums: null,
        bio: null,
        image: null,

        querySearch: '',

        objects: [],
        trendObject: [],
        
        pagNext : null,
        pagPrev: null,
        pagLast: null,
        pagFirst: null,

        pagination : null,
        pageNumber: null,
        totalPages: null,
        items: null, /* <--numero dischi totali */
// i dischi nel dettaglio:

        masterId: null,
        masterObject: [],


    },

    methods: {

        searchFunction: function() {
                    // SEZIONE RICERCA
        axios
        .get(discogsAPI, {
            params: {
                'query': this.querySearch,
                'token': API_TOKEN,
                'page': '1',
                'per_page': '12',
                // 'sort_order': 'asc',
                // 'format': 'album'
            }
        })
        .then ((response)=> {
            // this.artist = response.data.results[1]['title'];
            // this.image = response.data.results[1]['cover_image'];
            this.objects = response.data.results;
            this.pagNext = response.data.pagination['urls']['next'];
            this.pagLast = response.data.pagination['urls']['last'];

            this.pageNumber = response.data.pagination['page'];
            this.totalPages = response.data.pagination['pages'];
            this.items = response.data.pagination['items']

            // console.log('oggetto:', this.objects[0][0]['year']);
            // console.log('link next', this.pagNext);
            })
        },


        nextPage: function() {
            this.pagination = this.pagNext
            console.log('pagNext:', this.pagNext);
            axios
                .get(this.pagination)
                .then ((response)=> {
                    this.objects = response.data.results;
                    this.pageNumber = response.data.pagination['page'];

                    this.pagNext = response.data.pagination['urls']['next'];
                    this.pagPrev = response.data.pagination['urls']['prev'];
                    this.pagFirst = response.data.pagination['urls']['first'];
                    
                })

        },
        prevPage: function() {
            this.pagination = this.pagPrev
            console.log('pagPrev:', this.pagPrev);
            axios
                .get(this.pagination)
                .then ((response)=> {
                    this.objects = response.data.results;
                    this.pageNumber = response.data.pagination['page'];

                    this.pagNext = response.data.pagination['urls']['next'];
                    this.pagPrev = response.data.pagination['urls']['prev'];
                    this.pagLast = response.data.pagination['urls']['last'];
                    this.pagFirst = response.data.pagination['urls']['first'];
                })

        },
        lastPage: function() {
            this.pagination = this.pagLast
            console.log('pagLast:', this.pagLast);
            axios
                .get(this.pagination)
                .then ((response)=> {
                    this.objects = response.data.results;
                    this.pageNumber = response.data.pagination['page'];

                    this.pagNext = response.data.pagination['urls']['next'];
                    this.pagPrev = response.data.pagination['urls']['prev'];
                    this.pagLast = response.data.pagination['urls']['last'];
                    this.pagFirst = response.data.pagination['urls']['first'];

                })

        },
        firstPage: function() {
            this.pagination = this.pagFirst
            console.log('pagFirst:', this.pagFirst);
            axios
                .get(this.pagination)
                .then ((response)=> {
                    this.objects = response.data.results;
                    this.pageNumber = response.data.pagination['page'];

                    this.pagNext = response.data.pagination['urls']['next'];
                    this.pagPrev = response.data.pagination['urls']['prev'];
                    this.pagLast = response.data.pagination['urls']['last'];
                    this.pagFirst = response.data.pagination['urls']['first'];

                })

        },


    },


    mounted () {

        // SEZIONE MUSICA IN TENDENZA
        axios
            .get(trendAPI, {
                params: {
                    'token': API_TOKEN,
                    'page': '1',
                    'per_page': '8',
                    'sort_order' :'hot'
                }
            })
            .then((response)=> {
                this.trendObject = response.data.results;
                // console.log(this.trendObject);
            })

        // FINE SEZIONE MUSICA IN TENDENZA


    }

})
