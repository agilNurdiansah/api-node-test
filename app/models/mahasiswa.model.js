module.exports = mongoose => {
    
    const schema = mongoose.Schema(
        {
            nama_lengkap: String,
            jenis_kelamin: String,
            tempat_lahir: String,
            tanggal_lahir: String,
            alamat: String,
        }, {
            timestamps: true
        }
    );

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;

        return object;
    });

    return mongoose.model("mahasiswa", schema);
}