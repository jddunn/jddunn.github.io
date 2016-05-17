using UnityEngine;
using System.Collections;

public class TextJSONUpdate : MonoBehaviour {

	// Use this for initialization
	void Start () {

		 //		COMPUTER FILES
		 string[] urls = {
		  "http://www.textfiles.com/100/914bbs.txt",		
		  "http://www.textfiles.com/computers/fbi.sys",
		  "http://www.textfiles.com/computers/filename.txt",
		  "http://www.textfiles.com/computers/floppies.txt",

		  //	DRUG FILES
		  "http://www.textfiles.com/drugs/12reason.leg",						
		  "http://www.textfiles.com/drugs/aa.jok",
		  "http://www.textfiles.com/drugs/acidtrip.hum",
		  "http://www.textfiles.com/drugs/alien.txt",
		  "http://www.textfiles.com/drugs/armylsd.drg",
		  "http://www.textfiles.com/food/appetiz.rcp",
		  "http://www.textfiles.com/food/bakebred.txt",

		  //	ANARCHY
		  "http://www.textfiles.com/anarchy/203.txt",
		  "http://www.textfiles.com/anarchy/alarm.fun",
		  "http://www.textfiles.com/anarchy/176.txt",
		  "http://www.textfiles.com/anarchy/001.txt",
		  "http://www.textfiles.com/anarchy/ac.ana",
		  "http://www.textfiles.com/anarchy/anarchy.txt",
		  "http://www.textfiles.com/anarchy/acbfile.txt",
		  "http://www.textfiles.com/anarchy/balloon.txt",
		  "http://www.textfiles.com/anarchy/beaspy.ana",
		  "http://www.textfiles.com/anarchy/bibfraud.txt",
		  "http://www.textfiles.com/anarchy/change.machine",

		  //	GAMES
		  "http://www.textfiles.com/games/chichess.src",
		  "http://www.textfiles.com/games/pmgoldbr.txt",
		  "http://www.textfiles.com/games/weakflip",

		  //	INTERNET
		  "http://www.textfiles.com/internet/acronyms.txt",
		  "http://www.textfiles.com/internet/ftp-7.acb",
		  "http://www.textfiles.com/internet/ftp-11.acb",
		  "http://www.textfiles.com/internet/ftp-9.acb",

		  //	FORUMS
		  "http://www.textfiles.com/messages/galaxy.txt",
		  "http://www.textfiles.com/messages/death2.txt",
		  "http://www.textfiles.com/messages/death.txt",
		  "http://www.textfiles.com/messages/grabbag.msg",
		  "http://www.textfiles.com/messages/messy.msg",
		  "http://www.textfiles.com/messages/tardis2.msg",

		  //	POLITICS
		  "http://www.textfiles.com/politics/0596af07.txt",
		  "http://www.textfiles.com/politics/0596af11.txt",
		  "http://www.textfiles.com/politics/101.txt",
		  "http://www.textfiles.com/politics/13th.txt",
		  "http://www.textfiles.com/politics/10batf",
		  "http://www.textfiles.com/politics/1863-get.txt",
		  "http://www.textfiles.com/politics/1lesson.txt",
		  "http://www.textfiles.com/politics/1wg-slav.txt",
		  "http://www.textfiles.com/politics/abecant.txt",
		  "http://www.textfiles.com/politics/address",
		  "http://www.textfiles.com/politics/alembic1.txt",
		  "http://www.textfiles.com/politics/al_gore.txt",
		  "http://www.textfiles.com/politics/billofr",
		  "http://www.textfiles.com/politics/c_a_m.txt",
		  "http://www.textfiles.com/politics/byeusa.yes",
		  "http://www.textfiles.com/politics/buyusa.txt",

		  //	SCIENCE
		  "http://www.textfiles.com/science/blkholes.fun",
		  "http://www.textfiles.com/science/ast-dece.txt",
		  "http://www.textfiles.com/science/astronau.txt",
		  "http://www.textfiles.com/science/chemburn.ana",
		  "http://www.textfiles.com/science/fracmath.txt",
		  "http://www.textfiles.com/science/g-solars.txt",
		  "http://www.textfiles.com/science/foodstuf",
		  "http://www.textfiles.com/science/gun.txt",
		  "http://www.textfiles.com/science/health.myt",
		  "http://www.textfiles.com/science/hi-e-wt.txt",
		  "http://www.textfiles.com/science/genelife.txt",
		  "http://www.textfiles.com/science/hot_wate.fas",
		  "http://www.textfiles.com/science/humble.how",
		  "http://www.textfiles.com/science/indylook.txt",
		  "http://www.textfiles.com/science/invent.rpt",
		  "http://www.textfiles.com/science/kennedy.txt",
		  "http://www.textfiles.com/science/launch.txt",
		  "http://www.textfiles.com/science/magellan.txt",
		  "http://www.textfiles.com/science/mars1.txt",
		  "http://www.textfiles.com/science/measure.sug",
		  "http://www.textfiles.com/science/merkle1.txt",
		  "http://www.textfiles.com/science/merkle2.txt",
		  "http://www.textfiles.com/science/metal.txt",
		  "http://www.textfiles.com/science/obsearth.txt",
		  "http://www.textfiles.com/science/orbname.txt",
		  "http://www.textfiles.com/science/perspect.txt",
		  "http://www.textfiles.com/science/parts.lst",
		  "http://www.textfiles.com/science/pihist.txt",
		  "http://www.textfiles.com/science/puzzle.jok",
		  "http://www.textfiles.com/science/vgrjup.fs",
		  "http://www.textfiles.com/science/vgrnep.fs",
		  "http://www.textfiles.com/science/vgrsat.fs",
		  "http://www.textfiles.com/science/vgrur.fs",

		  //		SURVIVAL
		  "http://www.textfiles.com/survival/117.txt",
		  "http://www.textfiles.com/survival/118.txt",
		  "http://www.textfiles.com/survival/1hrrads.txt",
		  "http://www.textfiles.com/survival/dental.txt",
		  "http://www.textfiles.com/survival/bunkers",
		  "http://www.textfiles.com/survival/fear",
		  "http://www.textfiles.com/survival/fire.txt",
		  "http://www.textfiles.com/survival/fire0001.txt",
		  "http://www.textfiles.com/survival/firebas.txt",
		  "http://www.textfiles.com/survival/firehous",
		  "http://www.textfiles.com/survival/invisibl.txt",
		  "http://www.textfiles.com/survival/iodine.txt",
		  "http://www.textfiles.com/survival/ircomm.txt",
		  "http://www.textfiles.com/survival/lfiweare.prn",
		  "http://www.textfiles.com/survival/litebulb.txt",
		  "http://www.textfiles.com/survival/media.txt",
		  "http://www.textfiles.com/survival/magndet.txt",
		  "http://www.textfiles.com/survival/livefree.txt",
		  "http://www.textfiles.com/survival/pinesoup.txt",
		  "http://www.textfiles.com/survival/number",
		  "http://www.textfiles.com/survival/paranoid",
		  "http://www.textfiles.com/survival/quakef.txt",
		  "http://www.textfiles.com/survival/quest.txt",
		  "http://www.textfiles.com/survival/snakelec.txt",
		  "http://www.textfiles.com/survival/suburb",
		  "http://www.textfiles.com/survival/survive.txt",
		  "http://www.textfiles.com/survival/tapcode.txt",
		  "http://www.textfiles.com/survival/tenherbs.txt",
		  "http://www.textfiles.com/survival/think",
		  "http://www.textfiles.com/survival/travel.txt",
		  "http://www.textfiles.com/survival/trlfds.txt",
		  "http://www.textfiles.com/survival/trouble",
		  "http://www.textfiles.com/survival/undgcomm.txt",
		  "http://www.textfiles.com/survival/urine.txt",
		  "http://www.textfiles.com/survival/warcycpc.txt",
		  "http://www.textfiles.com/survival/warlords",
		  "http://www.textfiles.com/survival/warvsgov.txt",
		  "http://www.textfiles.com/survival/warnings",
		  "http://www.textfiles.com/survival/whatsurv",

		  //		PROGRAMMING
		  "http://www.textfiles.com/programming/8080.op",
		  "http://www.textfiles.com/programming/acronyms.txt",
		  "http://www.textfiles.com/programming/ansi.txt",

		  //		HUMOUR
		  "http://www.textfiles.com/humor/101nos.txt",
		  "http://www.textfiles.com/humor/20types",
		  "http://www.textfiles.com/humor/59insn.txt",
		  "http://www.textfiles.com/humor/a-zfuck.txt",
		  "http://www.textfiles.com/humor/aclamt.txt",
		  "http://www.textfiles.com/humor/adcopy.hum",
		  "http://www.textfiles.com/humor/advrtize.txt",
		  "http://www.textfiles.com/humor/att.txt",
		  "http://www.textfiles.com/humor/aussie.lng",
		  "http://www.textfiles.com/humor/ambrose.bie",
		  "http://www.textfiles.com/humor/age.txt",
		  "http://www.textfiles.com/humor/admin.txt",
		  "http://www.textfiles.com/humor/aggie.txt",
		  "http://www.textfiles.com/humor/airlines",
		  "http://www.textfiles.com/humor/amchap2.txt",
		  "http://www.textfiles.com/humor/arab.dic",

		  //		STORIES
		  "http://www.textfiles.com/stories/16.lws",
		  "http://www.textfiles.com/stories/3lpigs.txt",
		  "http://www.textfiles.com/stories/7oldsamr.txt",
		  "http://www.textfiles.com/stories/ab40thv.txt",
		  "http://www.textfiles.com/stories/adv_alad.txt",
		  "http://www.textfiles.com/stories/aircon.txt",
		  "http://www.textfiles.com/stories/angry_ca.txt",
		  "http://www.textfiles.com/stories/angelfur.hum",
		  "http://www.textfiles.com/stories/bagelman.txt",

		  //		MUSIC
		  "http://www.textfiles.com/music/100worst.txt",
		  "http://www.textfiles.com/music/backward.bgr",
		  "http://www.textfiles.com/music/death.poetry.ii",

		  //		PIRACY
		  "http://www.textfiles.com/piracy/anatomy.txt",
		  "http://www.textfiles.com/piracy/arrest.fun",
		  "http://www.textfiles.com/piracy/cyberinf.txt",
		  "http://www.textfiles.com/piracy/eel_bye.txt",
		  "http://www.textfiles.com/piracy/manifest.-7",
		  "http://www.textfiles.com/piracy/menace.nfo",


		};
       	 string url = urls[Random.Range(0, urls.Length)];
 
         WWWForm form = new WWWForm();
         form.AddField("var1", "value1");
         form.AddField("var2", "value2");
         WWW www = new WWW(url, form);
 
         StartCoroutine(WaitForRequest(www));
	}

     IEnumerator WaitForRequest(WWW www)
     {
         yield return www;
 
         // check for errors
         if (www.error == null)
         {
             Debug.Log("WWW Ok!: " + www.text);
             GetComponent<TextMesh>().text = www.text;
         } else {
             Debug.Log("WWW Error: "+ www.error);
         }    
     }    
 
	
	// Update is called once per frame
	void Update () {
	
	}
}
