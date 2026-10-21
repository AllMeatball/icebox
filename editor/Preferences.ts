// Copyright (c) 2012-2022 John Nesky and contributing authors, distributed under the MIT license, see accompanying the LICENSE.md file.

import {Scale, Config} from "../synth/SynthConfig";

const LOCALSTORAGE_SUFFIX = "IceBox-";
export class Preferences {
	public static readonly defaultVisibleOctaves: number = 3;
	
	public autoPlay: boolean;
	public autoFollow: boolean;
	public enableNotePreview: boolean;
	public showFifth: boolean;
	public notesOutsideScale: boolean;
	public defaultScale: number;
	public showLetters: boolean;
	public showChannels: boolean;
	public showScrollBar: boolean;
	public alwaysFineNoteVol: boolean;
	public displayVolumeBar: boolean;
	public instrumentCopyPaste: boolean;
	public enableChannelMuting: boolean;
	public colorTheme: string;
	public layout: string;
	public displayBrowserUrl: boolean;
	public volume: number = 75;
	public visibleOctaves: number = Preferences.defaultVisibleOctaves;
	public pressControlForShortcuts: boolean;
	public keyboardLayout: string;
	public bassOffset: number;
	public enableMidi: boolean;
	public showRecordButton: boolean;
	public snapRecordedNotesToRhythm: boolean;
	public ignorePerformedNotesNotInScale: boolean;
	public metronomeCountIn: boolean;
	public metronomeWhileRecording: boolean;
	
	constructor() {
		this.reload();
	}

	public loadSetting(key: String): any {
		return window.localStorage.getItem(LOCALSTORAGE_SUFFIX+key);
	}

	public saveSetting(key: String, value: any): void {
		window.localStorage.setItem(LOCALSTORAGE_SUFFIX+key, value);
	}
	
	public reload(): void {
		this.autoPlay = this.loadSetting("autoPlay") == "true";
		this.autoFollow = this.loadSetting("autoFollow") != "false";
		this.enableNotePreview = this.loadSetting("enableNotePreview") != "false";
		this.showFifth = this.loadSetting("showFifth") == "true";
		this.notesOutsideScale = this.loadSetting("notesOutsideScale") == "true";
		this.showLetters = this.loadSetting("showLetters") == "true";
		this.showChannels = this.loadSetting("showChannels") == "true";
		this.showScrollBar = this.loadSetting("showScrollBar") == "true";
		this.alwaysFineNoteVol = this.loadSetting("alwaysFineNoteVol") == "true";
		this.displayVolumeBar = this.loadSetting("displayVolumeBar") == "true";
		this.instrumentCopyPaste = this.loadSetting("instrumentCopyPaste") == "true";
		this.enableChannelMuting = this.loadSetting("enableChannelMuting") == "true";
		this.displayBrowserUrl = this.loadSetting("displayBrowserUrl") != "false";
		this.pressControlForShortcuts = this.loadSetting("pressControlForShortcuts") == "true";
		this.enableMidi = this.loadSetting("enableMidi") != "false";
		this.showRecordButton = this.loadSetting("showRecordButton") == "true";
		this.snapRecordedNotesToRhythm = this.loadSetting("snapRecordedNotesToRhythm") == "true";
		this.ignorePerformedNotesNotInScale = this.loadSetting("ignorePerformedNotesNotInScale") == "true";
		this.metronomeCountIn = this.loadSetting("metronomeCountIn") != "false";
		this.metronomeWhileRecording = this.loadSetting("metronomeWhileRecording") != "false";
		this.keyboardLayout = this.loadSetting("keyboardLayout") || "wickiHayden";
		this.bassOffset = (+(<any>this.loadSetting("bassOffset"))) || 0;
		this.layout = this.loadSetting("layout") || "small";
		this.colorTheme = this.loadSetting("colorTheme") || "jummbox classic";
		this.visibleOctaves = ((<any>this.loadSetting("visibleOctaves")) >>> 0) || Preferences.defaultVisibleOctaves;
		
		const defaultScale: Scale | undefined = Config.scales.dictionary[this.loadSetting("defaultScale")!];
		this.defaultScale = (defaultScale != undefined) ? defaultScale.index : 0;
		
		if (this.loadSetting("volume") != null) {
			this.volume = Math.min(<any>this.loadSetting("volume") >>> 0, 75);
		}
		
		if (this.loadSetting("fullScreen") != null) {
			if (this.loadSetting("fullScreen") == "true") this.layout = "long";
			window.localStorage.removeItem("fullScreen");
		}
	}
	
	public save(): void {
		this.saveSetting("autoPlay", this.autoPlay ? "true" : "false");
		this.saveSetting("autoFollow", this.autoFollow ? "true" : "false");
		this.saveSetting("enableNotePreview", this.enableNotePreview ? "true" : "false");
		this.saveSetting("showFifth", this.showFifth ? "true" : "false");
		this.saveSetting("notesOutsideScale", this.notesOutsideScale ? "true" : "false");
		this.saveSetting("defaultScale", Config.scales[this.defaultScale].name);
		this.saveSetting("showLetters", this.showLetters ? "true" : "false");
		this.saveSetting("showChannels", this.showChannels ? "true" : "false");
		this.saveSetting("showScrollBar", this.showScrollBar ? "true" : "false");
		this.saveSetting("alwaysFineNoteVol", this.alwaysFineNoteVol ? "true" : "false");
		this.saveSetting("displayVolumeBar", this.displayVolumeBar ? "true" : "false");
		this.saveSetting("enableChannelMuting", this.enableChannelMuting ? "true" : "false");
		this.saveSetting("instrumentCopyPaste", this.instrumentCopyPaste ? "true" : "false");
		this.saveSetting("displayBrowserUrl", this.displayBrowserUrl ? "true" : "false");
		this.saveSetting("pressControlForShortcuts", this.pressControlForShortcuts ? "true" : "false");
		this.saveSetting("enableMidi", this.enableMidi ? "true" : "false");
		this.saveSetting("showRecordButton", this.showRecordButton ? "true" : "false");
		this.saveSetting("snapRecordedNotesToRhythm", this.snapRecordedNotesToRhythm ? "true" : "false");
		this.saveSetting("ignorePerformedNotesNotInScale", this.ignorePerformedNotesNotInScale ? "true" : "false");
		this.saveSetting("metronomeCountIn", this.metronomeCountIn ? "true" : "false");
		this.saveSetting("metronomeWhileRecording", this.metronomeWhileRecording ? "true" : "false");
		this.saveSetting("keyboardLayout", this.keyboardLayout);
		this.saveSetting("bassOffset", String(this.bassOffset));
		this.saveSetting("layout", this.layout);
		this.saveSetting("colorTheme", this.colorTheme);
		this.saveSetting("volume", String(this.volume));
		this.saveSetting("visibleOctaves", String(this.visibleOctaves));
	}
}
