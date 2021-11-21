
// sk.noiseArray = createNoiseArray();

// function createNoiseArray()
// {
//     var rand = mulberry32(2382012389);
//     var arr = new Array(10000000);
//     for(var i = 0; i < 10000000; i++)
//     {
//         arr = rand();
//     }
//     return arr;
// }

function Drunk(seed)
{
    this.seed = seed;
    this.start;
    this.end;
    this.rand;
    this.pos = 0;

    this.next = function(speed)
    {
        if(this.start === undefined || this.end === undefined || this.rand === undefined)
        {
            this.rand = new Rand(this.seed);
            this.start = this.rand.next();
            this.end = this.rand.next();
        }

        this.pos += speed;

        if(this.pos > 1.0)
        {
            this.start = this.end;
            this.end = this.rand.next();
            this.pos = 0;
        }

        return lerp(this.start,this.end,this.pos);
    }

    this.setSeed = function(seed)
    {
        this.seed = seed;
    }

    this.reset = function()
    {
        this.rand = new Rand(this.seed);
        this.start = this.rand.next();
        this.end = this.rand.next();
        this.pos = 0;
    }
}

function Rand(seed)
{
    this.seed = seed;
    this.randfunc = mulberry32(this.seed)

    this.next = function()
    {
        return this.randfunc();
    }

    this.reset = function()
    {
        this.randfunc = mulberry32(this.seed);
    }
}

function Chance(seed)
{
    this.seed = seed;
    this.rand;

    this.next = function(probability)
    {
        if(this.rand === undefined)
        {
            this.rand = new Rand(this.seed);
        }

        if(this.rand.next() < probability)
        {
            return true;
        }
        return false;
    }

    this.reset = function()
    {
        this.rand = new Rand(this.seed);
    }
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = (t ^ t >>> 15) * (t | 1);
      t ^= t + (t ^ t >>> 7) * (t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
