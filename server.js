//* requiring needed packages

const express = require( "express" );
const path = require( "path" );
const app = express();
// Helper method for generating unique id
var uuid = require( "uuid.v4" );

//* creating port in 3001
const PORT = process.env.PORT || 3001;
const { notes } = require( "./db/db.json" ); 

//* middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( "public" ) );

//* GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get( "/api/notes", ( req, res ) => {
	res.json( notes );
} );
//* POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 

app.post( "/api/notes", ( req, res ) => {

	const { title, text } = req.body;
	if ( req.body ) {
		const newNote = {
			title,
			text,
			//* allows each note to have a unique id when it's saved
			id: uuid(),
    
		};
		notes.push( newNote );
		res.json( notes );
        
      
	} else {
		res.json( { error: "Title and text are required" } );
	}
    
} );

//* GET /notes should return the notes.html file.
app.get ( "/notes", ( req, res ) => {
	res.sendFile( path.join( __dirname,"./public/notes.html" ) );
} );

app.get ( "*", ( req, res ) => {
	res.sendFile( path.join( __dirname,"./public/index.html" ) );
} );



//* starting server in PORT 3001

app.listen ( PORT, () => {
	console.log( `App listening at http://localhost:${PORT} 🚀` );
} );