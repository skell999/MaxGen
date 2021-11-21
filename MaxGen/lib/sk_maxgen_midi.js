
function isPlaying(val)
{
    if(val === 0)
    {
        sk.midi.all_notes_off();
    }
}

function Midi()
{
    this.note = new Array(16)
    this.status_note_off = 0x80;
    this.status_note_on = 0x90;
    this.status_poly_aftertouch = 0xa0;
    this.status_cc = 0xb0;
    this.status_prog_change = 0xc0; 
    this.status_aftertouch = 0xd0;
    this.status_pitchbend = 0xe0;
    
    this.makenote = function(note,velo,div,chan,tick,ppq)
    {   
        if(note > 127 || note < 0) {error("Midi note value out of range\n");return;}
        if(velo > 127 || velo < 0) {error("Midi velocity value out of range\n");return;}
        if(chan > 15 || chan < 0) {error("Midi channel value out of range\n");return;}
        note = Math.round(note);
        velo = Math.round(velo);
        tick = Math.round(tick);
        if(this.note[chan][note] != undefined)
        {
            this.note_off(note,0,chan);
        }
        var end_tick = Math.round(tick + (ppq * 4 * div));
        this.note[chan][note] = end_tick;
        this.note_on(note,velo,chan);
    }

    this.note_on = function(note,velo,chan)
    {
        outlet(1,this.status_note_on + Math.round(chan));
        outlet(1,Math.round(note));
        outlet(1,Math.round(velo));
    }

    this.note_off = function(note,velo,chan)
    {
        outlet(1,this.status_note_off + Math.round(chan));
        outlet(1,Math.round(note));
        outlet(1,Math.round(velo));        
    }

    this.cc = function(num,val,chan)
    {
        if(num > 127 || val > 127) {post("cc parse error",num,val,chan,'\n');return;}
        outlet(1,this.status_cc + Math.round(chan));
        outlet(1,Math.round(num));
        outlet(1,Math.round(val));  
    }

    this.prog_change = function(num,chan)
    {
        outlet(1,this.status_prog_change + Math.round(chan));
        outlet(1,Math.round(num));        
    }

    this.aftertouch = function(val,chan)
    {
        outlet(1,this.status_aftertouch + Math.round(chan));
        outlet(1,Math.round(val));       
    }

    this.pitchbend = function(val,chan)
    {
        val = Math.round(val);
        var lsb = val & 0x7f;
        var msb = (val & 0x3f80) >>> 7;
        outlet(1,this.status_pitchbend + Math.round(chan));
        outlet(1,lsb);
        outlet(1,msb);
    }

    this.all_notes_off = function()
    {
        for(var chan = 0; chan < 16; chan++)
        {
            outlet(1,this.status_cc + chan);
            outlet(1,123);
            outlet(1,0);
        }
    }

    this.do_note_off = function(tick)
    {
        for (var chan = 0; chan < this.note.length; chan++) {
            for(var note = 0; note < 128; note++)
            {
                if(this.note[chan][note] === tick)
                {
                    this.note_off(note,0,chan);
                    this.note[chan][note] = undefined;
                }
            }
        }
    }

    this.init = function()
    {          
        for (var i = 0; i < this.note.length; i++) {
            this.note[i] = new Array(128);
        }
        this.all_notes_off();
    }
    this.init();
}