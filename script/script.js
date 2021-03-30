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
        styles: null,
        tracklist: null,

        savedRecord: [],
        // LIBRARY ADD È L'ICONA PER AGGIUNGERE IL
        // DISCO TRA I PREFERITI
        libraryAdd: 'favorite_border',
        libraryAdded:'library_add_check',

        isPreferClass: 'prefer',
        defaultClass: ''

    },

    methods: {
        // markRecord: function(item, target) {
        //     let list = target.classList
        //     if (list.contains('prefer')) {
        //         list.remove('prefer')
                
        //     }else {
        //         list.add('prefer')
        //     }
        //     // console.log('markRecord:', this.list);

        // },

        openOverlay: function(item) {
            master_id = item.master_id
            console.log(master_id);

            this.masterApiUrl = masterAPI + master_id;
            console.log(this.masterApiUrl);
            axios
                .get(this.masterApiUrl)
                .then((response)=> {
                    this.masterObject = response.data;
                    // this.mainReleaseUrl = response.data['main_release_url']
                    // console.log(this.mainReleaseUrl);
                    console.log(this.masterObject);
                    this.styles = response.data.styles
                    this.tracklist = response.data.tracklist
                    

                })



        },

        saveRecord: function(item, index) {
            
            if (this.savedRecord.includes(item)) {
                alert('Già presente!')
                console.log('già presente');
            } else {
                this.savedRecord.push(item)



                window.scrollBy(0,2000);
                scrolldelay = setTimeout(pageScroll,10);


            }
                console.log('item:',item);
                console.log('item.id:',item.id);
                console.log('index:',index);
                console.log('array', this.savedRecord);
        },

        removeAlbum: function (item, index) {
            this.savedRecord.splice(index, 1)

        },
        
        saveSearchRecord: function(object, index) {
            if (this.savedRecord.includes(object)) {
                alert('Già presente!!')

                
            } else {
                this.savedRecord.push(object);

            console.log(this.savedRecord);
            }


            console.log(this.savedRecord);

        },


        // infoDisco: function(event) {
        //     // RECUPERO IL MASTER_ID DEL SINGOLO DISCO PASSANDO IL MOUSE SUL MASTER ID RELATIVO
        //     this.masterId = event.srcElement.textContent
        //     console.log(this.masterId); 

        //     this.masterApiUrl = masterAPI + this.masterId;
        //     console.log(this.masterApiUrl);
        //     axios
        //         .get(this.masterApiUrl)
        //         .then((response)=> {
        //             this.masterObject = response.data;
        //             // this.mainReleaseUrl = response.data['main_release_url']
        //             // console.log(this.mainReleaseUrl);
        //             console.log(this.trendObject);

        //         })
        //     // GRAZIE AL MASTER_ID RECUPERO I DATI DEL MAIN RELEASE
        //     // axios
        //     //     .get(this.mainReleaseUrl)
        //     //     .then((response)=> {
        //     //         this.mainReleaseObject = response.data;
        //     //         console.log(this.mainReleaseObject);
        //     //     })



        //         // axios.all ([
        //         //     axios.get(this.masterApiUrl),
        //         //     axios.get(this.mainReleaseUrl)
        //         // ])

        //         //     .then(axios.spread((result1, result2) => {
        //         //         this.mainReleaseUrl = result1.response.data['main_release_url'];
        //         //         this.mainReleaseObject = result2.response.data;
        //         //         console.log(this.mainReleaseUrl);
        //         //         console.log(this.mainReleaseObject);
        //         //     }));

        // },


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

            window.scrollBy(0,1000);
            // scrolldelay = setTimeout(pageScroll,1000);



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
