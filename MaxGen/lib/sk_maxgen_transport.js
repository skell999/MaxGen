function Transport()
{
    this.tick;
    this.ppq;
    this.tempo;
    this.numer;
    this.denom;
    this.isPlaying;

    this.set = function(tick,ppq,tempo,numer,denom,isPlaying)
    {
        this.tick = tick;
        this.ppq = ppq;
        this.tempo = tempo;
        this.numer = numer;
        this.denom = denom;
        this.isPlaying = isPlaying;
    }
}

function transport(tick,ppq,tempo,numer,denom,isPlaying)
{
    sk.transport.set(tick,ppq,tempo,numer,denom,isPlaying);
    sk.midi.do_note_off(tick);
    run(tick,ppq,tempo,numer,denom,isPlaying);
}