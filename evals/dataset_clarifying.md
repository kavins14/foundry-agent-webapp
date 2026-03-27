# Nureva Console Sense AI — Clarifying Questions Eval Dataset

Each example is a multi-turn conversation. The agent should ask a clarifying question on Turn 1
before answering. Turn 2 is the user's follow-up with the needed context.

**Pass criteria:** Agent asks ONE focused clarifying question on Turn 1, then answers correctly on Turn 2
**Fail criteria:** Agent answers without clarifying on Turn 1, asks multiple questions, or fails to answer well after clarification

---

## Example 1
**Ambiguity Type:** A1 — Product unspecified
**Persona:** P10 — Facilities Manager

**Turn 1 — User:**
> "Can you help me get the audio set up in our boardroom? We have one of those Nureva bar things on the wall."

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "I think it's the HDL300 — it's just one bar, not two."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 2
**Ambiguity Type:** A1 — Product unspecified
**Persona:** P3 — Teacher

**Turn 1 — User:**
> "I just want to know how to turn on the microphone in my classroom. It's the Nureva device."

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "I'm not sure of the model — it's a long bar that runs across the top of the whiteboard."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 3
**Ambiguity Type:** A1 — Product unspecified
**Persona:** P4 — Corporate User

**Turn 1 — User:**
> "Our conference room has a Nureva system. Does it need to be plugged into the laptop or does it connect automatically?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "It's the HDL310."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 4
**Ambiguity Type:** A1 — Product unspecified
**Persona:** P9 — Reseller

**Turn 1 — User:**
> "A client is asking me what the maximum room size is for the Nureva unit we installed. Can you confirm?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "It's the HDL410."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 5
**Ambiguity Type:** A2 — Problem too vague
**Persona:** P3 — Teacher

**Turn 1 — User:**
> "The audio in my classroom isn't working."

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "When I join a Teams call, the far end says they can't hear anyone in the room. The HDL310 has a solid green LED."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 6
**Ambiguity Type:** A2 — Problem too vague
**Persona:** P4 — Corporate User

**Turn 1 — User:**
> "People on calls keep saying they can't hear us properly. Can you help?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "We have an HDL310 and people on Zoom say our voices keep cutting in and out."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 7
**Ambiguity Type:** A2 — Problem too vague
**Persona:** P1 — IT Admin

**Turn 1 — User:**
> "We're having issues with one of our Nureva devices. It was working yesterday."

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "It's an HDL410 in room B2 — it's showing offline in Nureva Console even though it has power and a network connection."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 8
**Ambiguity Type:** A2 — Problem too vague
**Persona:** P10 — Facilities Manager

**Turn 1 — User:**
> "The system in room 3B is making a weird noise. Is that normal?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "It's a constant hum or buzz. Happens all the time, even when nobody is on a call."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 9
**Ambiguity Type:** A3 — Out of scope
**Persona:** P5 — Government IT Manager

**Turn 1 — User:**
> "We're looking to standardize our conference rooms with a single vendor. Does Nureva also make video conferencing cameras and displays, or just the audio?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "OK understood. Which camera brands does Nureva integrate with so I can look at those?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 10
**Ambiguity Type:** A3 — Out of scope
**Persona:** P7 — School Administrator

**Turn 1 — User:**
> "We want to add wireless presentation capability to the same rooms where we have Nureva audio. Does Nureva have something for that, or do we need a separate solution?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "Got it. Does the Nureva audio work alongside something like Barco ClickShare without any conflicts?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 11
**Ambiguity Type:** A3 — Out of scope
**Persona:** P4 — Corporate User

**Turn 1 — User:**
> "Can I use the Nureva system to record meetings locally to a USB drive?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "Is there any way to record meetings through Nureva at all, even if not locally?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 12
**Ambiguity Type:** A4 — Use-case-dependent
**Persona:** P1 — IT Admin

**Turn 1 — User:**
> "What's the best way to deploy Nureva devices across multiple sites?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "We have about 50 rooms across 3 locations, all on the same Azure AD tenant, running Microsoft Teams."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 13
**Ambiguity Type:** A4 — Use-case-dependent
**Persona:** P2 — AV Integrator

**Turn 1 — User:**
> "Which Nureva system would you recommend for a large room?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "It's a boardroom, roughly 30x25 feet, seats about 20 people, no divisible partition."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 14
**Ambiguity Type:** A4 — Use-case-dependent
**Persona:** P7 — School Administrator

**Turn 1 — User:**
> "Is Nureva a good fit for our school?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "We have 40 classrooms, K-12, hybrid and in-person learning, primarily using Google Meet."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 15
**Ambiguity Type:** A5 — Feature not in docs
**Persona:** P1 — IT Admin

**Turn 1 — User:**
> "Can we configure the HDL system to automatically mute itself outside of business hours?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "OK — is there any scheduling or automation capability at all through Console or the API?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 16
**Ambiguity Type:** A5 — Feature not in docs
**Persona:** P8 — Developer

**Turn 1 — User:**
> "Is there a webhook I can subscribe to for device health events so we get notified when a unit goes offline?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "Understood. Is there any way to poll for device status programmatically instead?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 17
**Ambiguity Type:** A5 — Feature not in docs
**Persona:** P6 — Healthcare IT

**Turn 1 — User:**
> "Can the Nureva system be configured to comply with HIPAA requirements for audio data handling?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "Does Nureva have any security whitepaper or compliance documentation we could review for our legal team?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 18
**Ambiguity Type:** A6 — Future/unannounced
**Persona:** P5 — Government IT Manager

**Turn 1 — User:**
> "What's Nureva's roadmap for the next 12 months? We need to plan our AV budget."

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "At minimum, can you tell me what's currently announced? We've heard about something called the HDX."

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 19
**Ambiguity Type:** A6 — Future/unannounced
**Persona:** P2 — AV Integrator

**Turn 1 — User:**
> "When exactly is the HDX launching and what will the full spec sheet look like? I need to start quoting it for clients."

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "What IS known about the HDX so far? Anything on target room size or starting price?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___

---

## Example 20
**Ambiguity Type:** A6 — Future/unannounced
**Persona:** P9 — Reseller

**Turn 1 — User:**
> "Will there be any new Nureva products announced this year that I should be telling my customers about?"

**Turn 1 — Agent:**
> _[paste agent response here]_

**Turn 2 — User:**
> "What about the HDX — what can you tell me about that so far?"

**Turn 2 — Agent:**
> _[paste agent response here]_

**Pass/Fail:** ___
**Critique:** ___
