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
        masterObject: null,

        singleRecord: null,
        singleRecordIndex: null,

        masterApiUrl: null,
        mainReleaseUrl: null,
        mainReleaseObject: null,

        savedRecord: [],
        // LIBRARY ADD È L'ICONA PER AGGIUNGERE IL
        // DISCO TRA I PREFERITI
        libraryAdd: 'library_add',
        libraryAdded:'library_add_check',


    },

    methods: {

        saveRecord: function(index) {

                if (this.savedRecord.includes(this.trendObject[index])) {
                    console.log('fuckk');
                    alert('già presente')

                    
                } else {
                    this.savedRecord.push(this.trendObject[index]);
                    console.log(this.savedRecord);


                }
                



            // console.log(this.savedRecord);
            // console.log(this.trendObject[index]);

                    
            


            // this.libraryAdd = this.libraryAdded;
            // console.log('saved records', this.savedRecord);
            // console.log('object', this.trendObject[index])

        },
        
        saveSearchRecord: function(index) {
            this.savedRecord.push(this.objects[index]);
            console.log(this.savedRecord);

        },


        infoDisco: function(event) {
            // RECUPERO IL MASTER_ID DEL SINGOLO DISCO PASSANDO IL MOUSE SUL MASTER ID RELATIVO
            this.masterId = event.srcElement.textContent
            console.log(this.masterId); 

            this.masterApiUrl = masterAPI + this.masterId;
            console.log(this.masterApiUrl);
            axios
                .get(this.masterApiUrl)
                .then((response)=> {
                    this.masterObject = response.data;
                    // this.mainReleaseUrl = response.data['main_release_url']
                    // console.log(this.mainReleaseUrl);
                    console.log(this.trendObject);

                })
            // GRAZIE AL MASTER_ID RECUPERO I DATI DEL MAIN RELEASE
            // axios
            //     .get(this.mainReleaseUrl)
            //     .then((response)=> {
            //         this.mainReleaseObject = response.data;
            //         console.log(this.mainReleaseObject);
            //     })



                // axios.all ([
                //     axios.get(this.masterApiUrl),
                //     axios.get(this.mainReleaseUrl)
                // ])

                //     .then(axios.spread((result1, result2) => {
                //         this.mainReleaseUrl = result1.response.data['main_release_url'];
                //         this.mainReleaseObject = result2.response.data;
                //         console.log(this.mainReleaseUrl);
                //         console.log(this.mainReleaseObject);
                //     }));

        },


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
