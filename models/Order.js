var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var OrderSchema = new Schema({
    quantity:{type:Number},
    billingAddress:{type:String,required: true},
    shippingAddress:{type:String,required: true},
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }], 
    paid:{type:Boolean,default:0},    
    amount:{type:Number},  
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});
OrderSchema.pre('save', function(next){
    now = new Date();    
    this.updated_at = now;
    if(!this.createdDate) {
        this.createdDate = now
    }
    next();
});
module.exports = mongoose.model('Order', OrderSchema);