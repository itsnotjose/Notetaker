//* requiring needed packages

const express = require( "express" );
//const fs = require( "fs" );
const path = require( "path" );
const app = express();
var uuid = require( "uuid.v4" );
// Helper method for generating unique id
//* creating port in 3001

const PORT = process.env.PORT || 3001;
const { notes } = require( "./db/db.json" ); 
//TODO need to create app.use for public
//TODO need to add middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( "public" ) );

//TODO GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get( "/api/notes", ( req, res ) => {
	res.json( notes );
} );
//TODO POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
//* allows each note to have a unique id when it's saved

        
app.post( "/api/notes", ( req, res ) => {

	const { title, text } = req.body;
	if ( req.body ) {
		const newNote = {
			title,
			text,
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