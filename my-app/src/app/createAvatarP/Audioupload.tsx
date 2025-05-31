"use client"
import React from 'react'
import { Mic, Headphones, Camera, StopCircle, X, AlertTriangle, Music } from 'lucide-react';
import Image from 'next/image';

interface AudiouploadProps {
  openFileSelector: (ref: React.RefObject<HTMLInputElement>) => void;
  audioInputRef: React.RefObject<HTMLInputElement | null>
  recordingAudio: boolean;
  stopRecording: () => void;
  startRecording: () => void;
  setShowGalleryAudios: React.Dispatch<React.SetStateAction<boolean>>;
  showGalleryAudios: boolean;
  galleryAudios: string[];
  handleAudioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    text?: string;
    image?: string;
    audio?: string;
  };
  audio: File | null;
  handleAudioSelect: (audioUrl: string) => Promise<void>;
  setAudio: React.Dispatch<React.SetStateAction<File | null>>;
  setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  audioUrl: string | null;
}

const Audioupload = ({
  openFileSelector,
  audioInputRef,
  recordingAudio,
  stopRecording,
  startRecording,
  setShowGalleryAudios,
  showGalleryAudios,
  galleryAudios,
  handleAudioChange,
  errors,
  audio,
  handleAudioSelect,
  setAudio,
  setAudioUrl,
  audioRef,
  audioUrl
}: AudiouploadProps) => {
  const getAudioName = (audioUrl: string) => {
    const filename = audioUrl.split('/').pop() || audioUrl;
    return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
  };

  return (
    <>
      <div>
        <div className="space-y-3">
          <label className="flex items-center text-sm font-medium text-purple-700 mb-2">
            <Mic className="h-4 w-4 mr-2" />
            Audio Upload
          </label>

          <div className="grid lg:grid-cols-3 lg:grid-col-2 gap-3">
            <button
              type="button"
              onClick={() => openFileSelector(audioInputRef)}
              className={`flex items-center justify-center cursor-pointer px-4 py-4 border-2 rounded-lg transition-all duration-200 ${errors.audio
                ? 'bg-red-100 text-red-700 border-red-300'
                : 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 hover:border-purple-400'
                }`}
            >
              <Headphones className="h-5 w-5 mr-2" />
              <span>Upload Audio</span>
            </button>

            <button
              type="button"
              onClick={recordingAudio ? stopRecording : startRecording}
              className={`flex items-center justify-center px-4 cursor-pointer py-4 border-2 rounded-lg transition-all duration-200 ${recordingAudio
                ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400'
                : 'bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300 hover:border-purple-400'
                }`}
            >
              {recordingAudio ? (
                <>
                  <StopCircle className="h-5 w-5 mr-2 text-red-600" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  <span>Record Voice</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowGalleryAudios(true)}
              className="flex items-center cursor-pointer justify-center px-4 py-4 border-2 rounded-lg bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300 hover:border-purple-400 transition-all duration-200"
            >
              <Camera className="h-5 w-5 mr-2" />
              <span>Choose from Gallery</span>
            </button>

            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="hidden"
            />
          </div>

          {recordingAudio && (
            <div className="mt-3 bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-700">Recording in progress...</span>
                </div>
                <span className="text-xs text-red-500">{recordingAudio && "Click to stop"}</span>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={stopRecording}
                  className="p-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all"
                >
                  <StopCircle className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          )}

          {errors.audio && (
            <p className="text-sm text-red-600 flex items-center mt-2">
              <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
              {errors.audio}
            </p>
          )}

          {audio && !recordingAudio && (
            <div className="mt-4 bg-purple-50 p-5 rounded-lg border-2 border-purple-200 transition-all duration-200 hover:border-purple-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-700">
                    <Music className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-purple-800 truncate">{audio.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (audioUrl) URL.revokeObjectURL(audioUrl);
                    setAudio(null);
                    setAudioUrl(null);
                  }}
                  className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {audioUrl && (
                <div>
                  <p className="text-xs font-medium text-purple-600 mb-2">Audio Preview:</p>
                  <audio
                    ref={audioRef}
                    controls
                    className="w-full h-10"
                    src={audioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showGalleryAudios && (
        <div className="flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-3xl max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-black">Choose an Audio</h3>
              <button
                onClick={() => setShowGalleryAudios(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-black" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {galleryAudios.map((audioSrc, index) => (
                <div
                  key={index}
                  className="flex w-40 items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleAudioSelect(audioSrc)}
                >
                  <div className="relative w-14 h-12 mr-3 flex-shrink-0">
                    <Image
                      src="/aud.jpg"
                      alt="Audio icon"
                      fill
                      className="object-cover rounded"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded text-white">
                      <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-medium text-gray-900 truncate">
                      {getAudioName(audioSrc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Audioupload