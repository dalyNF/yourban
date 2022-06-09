const express = require("express");

const fs = require("fs");
const fichier = fs.readFileSync("fakeData.json");
const etablissements = JSON.parse(fichier);


const app = express();
const PORT = 6000 ;

app.use(express.static('public'));
app.use(express.json());


app.get("/api", (req, res) => {
    res.json({
        message:"Welcome to the API"
    });
})


// GET ALL ETABLISSEMENTS ****
app.get("/api/etablissements" , (req, res) => {
    res.json(etablissements)
    console.log(etablissements)
});


// SAVE NEW ETABLISSEMENT 
app.post("/api/etablissements/save" , (req, res) => {
    const newEtablissement =  {
            id : etablissements.length +1 ,
            etablissement_type: req.body.etablissement_type,
            etablissement: req.body.etablissement,
            location: req.body.location,
            address: req.body.address,
            mail:req.body.mail   
    }
    etablissements.push(newEtablissement)
    res.json(newEtablissement)
    // console.log(newEtablissement)
});

//GET ETABLISSEMENT BY ID 
app.get("/api/etablissements/:etablissementId" , (req, res) => {
    let id = req.params;
    const found = etablissements.find(element => element === id);
    // console.log(id)
    console.log(etablissements[0].id)
    if (!found) {
        return res.status(404).send('etablissements not found')
    }
    res.json(etablissements)
    // console.log(newEtablissement)
});


// UPDATE ETABLISSEMENT
app.put("/api/etablissements/:etablissementID", (req,res) => {
    const id = req.params;
    const index = etablissements.findIndex(etablissement => etablissement === id)
    if(index === -1) {
        return res.status(404).send("No etablissements with this ID");
    }
    const updatedEtablissement = {
        id: etablissements[index].id,
        etablissement_type: req.body.etablissement_type,
        etablissement: req.body.etablissement,
        location: req.body.location,
        address: req.body.address,
        mail:req.body.mail   
    }
    etablissements[index] = updatedEtablissement;
    res.status(200).json("etablissement updated")
}) 

//DELETE ETABLISSEMENT BY ID 
app.delete("/api/etablissements/:etablissementID"), (req, res) => {
    const id = req.params
    const index = etablissements.findIndex(etablissement => etablissement === id)
    console.log(id)
        if(index === -1) {
            return res.status(404).send("No etablissements with this ID");
        }
        etablissements.splice(index,1);
        res.status(200).json("Etablissement deleted");
}



app.listen(PORT, () =>{
    console.log(`Listenning on port ${PORT}`);
})