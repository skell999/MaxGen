include("sk_maxgen_transport.js")
include("sk_maxgen_ppq.js")
include("sk_maxgen_midi.js")
include("sk_maxgen_noise.js")
include("sk_maxgen_signal.js")
sk = {};
sk.transport = new Transport();
sk.midi = new Midi();

/****************************************************
 * PPQ
 ****************************************************/

/**
 * Returns 1 for every note onset
 *
 * @param {number} div Division of a bar, eg 1/4
 * @param {number} swing A float clamped between -1.0 (late) and 1.0 (early).
 * @return {number} 1 on every division, 0 otherwise
 */

function on(div,swing)
{
    var tick_duration = sk.transport.ppq * 4 * div;
    var tick_offset = 0;

    if(swing > 1.0) {swing = 1.0;}
    if(swing < -1.0) {swing = -1.0;}

    if(typeof(swing) === "number")
    {   
        // Using a modulo clock twice as long as clock division
        // First beat always quantized
        if(sk.transport.tick % (tick_duration * 2) === 0)
        {
            tick_offset = 0;
        // Second beat. Swung early with a positive float.
        }else if(swing > 0.0 && sk.transport.tick % (tick_duration * 2) < tick_duration)
        {
            tick_offset = tick_duration * swing;
        // Second beat. Swung late with a positive float.
        }else if(swing < 0.0 && sk.transport.tick % (tick_duration * 2) > tick_duration)
        {
            tick_offset = tick_duration * swing;
        }else
        // Prevent double triggering of second beat
        {
            return 0;
        }
    }

    return on_ppq(sk.transport.tick,div,sk.transport.ppq,tick_offset);
}

function count(div)
{
    return count_ppq(sk.transport.tick,div,sk.transport.ppq);
}

function when(div)
{
    return when_ppq(sk.transport.tick,div,sk.transport.ppq);
}

function loop(count,div)
{
    // for a given count 1/4 play one note on every 3/4
    // if(count(1/4) % 4 === 3 && every(1/4))
    // {
    //     note(60,100,1/16,1);
    // }
}

function rtm(div,seq)
{
    // Example
    // if(rtm( 1/16 ,[1,0,0,1,0,0,1,0] ))
    // {       
    //     note(60,100,1/17,1);
    // }
    if(on(div))
    {
        var pos = count(div) % seq.length;
        return seq[pos];
    }
    return false;
}

/****************************************************
 * Midi
 ****************************************************/

function note(note,velo,div,chan)
{
    chan = chan - 1;
    sk.midi.makenote(note,velo,div,chan,sk.transport.tick,sk.transport.ppq);
}

function cc(num,val,chan)
{
    chan = chan - 1;
    sk.midi.cc(num,val,chan);
}

function prog(num,chan)
{
    sk.midi.prog_change(num,chan)
}

function aftertouch(val,chan)
{
    sk.midi.aftertouch(val,chan);
}

/**
 * Send Midi pitch bend
 *
 * @param {number} val Pitch bend amount. -1.0 to 1.0
 * @param {number} chan Midi channel
 */
function pitchbend(val,chan)
{
    if(val > 1){val = 1;}
    if(val < -1){val = -1;}

    val = (val + 1) * 0.5;
    val = Math.round(val * 16383);

    sk.midi.pitchbend(val,chan);
}

/****************************************************
 * Signal
 ****************************************************/

function lerp(start,end,pos)
{
    return lerp_signal(start,end,pos);
}