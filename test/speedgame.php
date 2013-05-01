<?php $nocache = 11111;?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- saved from url=(0031)http://mootools.net/slickspeed/ -->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<title>SlickSpeed Selectors Test</title>
	<link rel="stylesheet" href="./SlickSpeedSelectorsTest_files/style.css" type="text/css" media="screen">
	
	<script type="text/javascript">
		window.selectors = ['body','div','body div','div p','div > p','div + p','div ~ p','div[class^=exa][class$=mple]','div p a','div, p, a','.note','div.example','ul .tocline2','div.example, div.note','#title','h1#title','div #title','ul.toc li.tocline2','ul.toc > li.tocline2','h1#title + div > p','h1[id]:contains(Selectors)','a[href][lang][class]','div[class]','div[class=example]','div[class^=exa]','div[class$=mple]','div[class*=e]','div[class|=dialog]','div[class!=made_up]','div[class~=example]','div:not(.example)','p:contains(selectors)','p:nth-child(even)','p:nth-child(2n)','p:nth-child(odd)','p:nth-child(2n+1)','p:nth-child(n)','p:only-child','p:last-child','p:first-child']	</script>
	
	<script src="./SlickSpeedSelectorsTest_files/slickspeed.js" type="text/javascript"></script>
</head>

<body>
	
<div id="container">
	
	<div id="controls">
		<a class="stop" href="http://mootools.net/slickspeed/#">stop tests</a>
		<a class="start" href="http://mootools.net/slickspeed/#">start tests</a>
	</div>
	
<h1><span>SlickSpeed</span></h1>
<h2>speed/validity selectors test for frameworks.</h2>
<p>Every framework runs in his own iFrame, thus no conflicts can happen. Tests are run selector by selector, with an interval to prevent the browser from freeezing.</p>
<p>Tests are run in a neutral environment, no library or framework is included in the main javascript test, to avoid favoritism.</p>

<p>Tests are run against a local copy of <a href="http://www.w3.org/TR/2001/CR-css3-selectors-20011113/">this document</a>.</p> 
<iframe name='qwrap.js' src='SlickSpeedSelectorsTest_files/template.php?include=qwrap-debug.js&function=Dom.query&nocache=<?php echo $nocache;?>'></iframe>

<iframe name='MooTools 1.3.1' src='SlickSpeedSelectorsTest_files/template.php?include=mootools1.3.1.js&function=$$&nocache=<?php echo $nocache;?>'></iframe>

<iframe name='JQuery 1.5.1' src='SlickSpeedSelectorsTest_files/template.php?include=jquery1.5.1.js&function=$&nocache=<?php echo $nocache;?>'></iframe>

<iframe name='Prototype 1.7' src='SlickSpeedSelectorsTest_files/template.php?include=prototype1.7.js&function=$$&nocache=<?php echo $nocache;?>'></iframe>

<iframe name='YUI 2.8.2 Selector' src='SlickSpeedSelectorsTest_files/template.php?include=yui.selector2.8.2.js&function=YAHOO.util.Selector.query&nocache=<?php echo $nocache;?>'></iframe>

<iframe name='Anole.dom.query' src='SlickSpeedSelectorsTest_files/template.php?include=../../src/core.js|../../src/dom.js&function=Anole.dom.query&nocache=<?php echo $nocache;?>'></iframe>


<table>

	<thead id="thead">
		<tr>
			<th class="selectors-title">selectors</th>
			<th class='framework'>Dom.query</th><th class='framework'>MooTools 1.3.1</th><th class='framework'>JQuery 1.5.1</th><th class='framework'>Prototype 1.7</th><th class='framework'>YUI 2.8.2 Selector</th><th class='framework'>Anole.dom.query</th>		</tr>
	</thead>

	<tbody id="tbody">
		<tr><th class='selector'>body</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>body div</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div p</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div > p</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div + p</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div ~ p</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class^=exa][class$=mple]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div p a</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div, p, a</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>.note</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div.example</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>ul .tocline2</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div.example, div.note</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>#title</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>h1#title</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div #title</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>ul.toc li.tocline2</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>ul.toc > li.tocline2</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>h1#title + div > p</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>h1[id]:contains(Selectors)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>a[href][lang][class]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class=example]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class^=exa]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class$=mple]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class*=e]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class|=dialog]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class!=made_up]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div[class~=example]</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>div:not(.example)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:contains(selectors)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:nth-child(even)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:nth-child(2n)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:nth-child(odd)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:nth-child(2n+1)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:nth-child(n)</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:only-child</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:last-child</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr><tr><th class='selector'>p:first-child</th><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td><td class='empty'></td></tr>	</tbody>
	
	<tfoot id="tfoot">
		<tr>
		<th class="score-title"><strong>final time (less is better)</strong></th>
		<td class='score'>0</td><td class='score'>0</td><td class='score'>0</td><td class='score'>0</td><td class='score'>0</td><td class='score'>0</td>		</tr>
	</tfoot>

</table>

<h2>Legend</h2>

<table id="legend">

	<tbody><tr>
		<th>the faster</th>
		<th>the slower</th>
		<th>exception thrown or zero elements found</th>
		<th>different returned elements</th>
	</tr>

	<tr>
		<td class="good"></td>
		<td class="bad"></td>
		<td class="exception"></td>
		<td class="mismatch"></td>
	</tr>

</tbody></table>

<div id="footer">
	<p class="footer">copyright © 2007 <a href="http://mootools.net/">http://mootools.net</a> | MIT License | <a href="http://slickspeed.googlecode.com/svn/trunk">download from googlecode</a></p>
</div></div>


</body></html>