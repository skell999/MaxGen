include("sk_maxgen.js");
autowatch = 1;
inlets = 2;
outlets = 2;

var cnt = 0;
var index = 0;

var rnd = new Rand(3457983352);
var drk1 = new Drunk(34725947);
var chnc1 = new Chance(485996654);
var chnc2 = new Chance(435793354347);
// var drk2 = new Drunk(3472854782);

// Bug run() gets called twice at the start of the ableton sequence.
// run() will be called twice for tick 0. Try seeing if isplaying is true to filter out double call
function run(tick,ppq,tempo,numer,denom,isPlaying)
{
    if(on(4/1))
    {
        drk1.reset();
        chnc1.reset();
    }

    if(on(1/12) && chnc1.next(1))
    {   
        var vary = 0;
        if(chnc2.next(0.1)){ vary = rnd.next() * 10}
        var sig = drk1.next(0.09) * 50 + 30 + vary;
        note(quant(sig,[0, 2, 5, 7]) + 1,100,1/16,1);
    }
}

function vnoise(index)
{
    index = Math.floor(index);
    return sk.noiseArray[index % 10000000];
}

function quant(input,scale)
{
    input = Math.floor(input);
	var scale_size = scale.length * 11;
    var index = Math.floor(linlin(input,0,127,0,scale_size));
    var octave = Math.floor(index / scale.length);
    var note = scale[index % scale.length] + (12 * octave);
    return note;
}

// [0, x, x, 3, x, 5, x, 7, x, x, 10, 11]
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


function msg_int(val)
{

}

function bang()
{
    // sk.noiseArray = new Array(10000000);
    // for(var i = 0; i < 10000000; i++)
    // {
    //     sk.noiseArray[i] = Math.random();
    // }
    
    post('yooo\n');
}

function reset()
{
}

function IntNoise(x)			 
{
    x = (x<<13) ^ x;
    return ( 1.0 - ( (x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);    
}

// https://github.com/velipso/whisky/blob/main/whisky.h
function whisky1(i0){
	var z0 = (i0 * 1831267127) ^ i0;
	var z1 = (z0 * 3915839201) ^ (z0 >> 20);
	var z2 = (z1 * 1561867961) ^ (z1 >> 24);
	return z2;
}

// post("-----------\n")
// var cnt2 = 0; 
// for (var index = 0; index < 10000; index++) {
//     var flt = Math.abs(whisky1(index) / Math.pow(2,31));
//     var rng = 0.9;
//     if(flt > rng && flt < (rng + 0.1))
//     {
//         cnt2++;
//         //outlet(0,flt);
//     }
//     post(flt + "\n");
//     // post(whisky1(index + 600));  
// }

// post(cnt2 + "\n")


