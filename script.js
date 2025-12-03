import { db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const findBtn = document.getElementById("findBtn");
const nextBtn = document.getElementById("nextBtn");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let pc, callDoc;

const servers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
};

async function setupMedia() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  stream.getTracks().forEach(t => pc.addTrack(t, stream));
  localVideo.srcObject = stream;
}

findBtn.onclick = async () => {
  findBtn.style.display = "none";
  nextBtn.style.display = "block";

  pc = new RTCPeerConnection(servers);
  pc.ontrack = event => remoteVideo.srcObject = event.streams[0];

  await setupMedia();

  callDoc = await addDoc(collection(db, "calls"), { status: "waiting" });

  onSnapshot(doc(db, "calls", callDoc.id), async snap => {
    const data = snap.data();

    if (data.answer && !pc.remoteDescription) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
    if (data.offer && !pc.localDescription) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await updateDoc(callDoc, { answer: answer.toJSON() });
    }
  });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await updateDoc(callDoc, { offer: offer.toJSON() });
};

nextBtn.onclick = () => location.reload();
