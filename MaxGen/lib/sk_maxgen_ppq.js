function on_ppq(tick,div,ppq,offset){
	var ppq_division = ppq * 4 * div
	if((tick + offset) % ppq_division === 0){
		return true;
	}
	return false;
}

function while_ppq(tick,div,ppq,scale){
    var ppq_division = ppq * 4 * div
	if(tick % ppq_division < ppq_division * scale){
        return true;
	}
	return false;
}

function count_ppq(tick,div,ppq){
    var ppq_division = ppq * 4 * div
	return Math.floor(tick / ppq_division)
}

function when_ppq(tick,div,ppq)
{
    var pos = ppq * 4 * div;
    if(tick === pos)
    {
        return true;
    }
    return false;
}

function div_to_ms(div,tempo,numerator)
{
    var bar_in_ms = (60.0 / tempo) * numerator;
    return Math.round(bar_in_ms * div * 1000);
}