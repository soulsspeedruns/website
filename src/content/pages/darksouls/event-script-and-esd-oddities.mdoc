---
title: "Event Script And ESD Oddities"
---

On this page are listed explanations of how specific parts of the game have been implemented via Event Script functions and ESD state machines, and how those implementations sometimes cause certain oddities to occur.

## Catacombs Coffin

The Catacombs coffin has 5 relevant functions for it of which 4 are related to the timer. A summary:

**1)** Function 1 starts a 30s wait timer when you get into the coffin and holds execution. If the 30s are allowed to pass without a restart, then the player is warped.

**2)** Function 2 checks every 2s if you are (still) in the coffin. If 2s pass, Function 3 is (re)started.

**3)** Function 3 waits for 5s and holds execution. If the 5s are allowed to pass, it will allow Function 4 to run which resets the 30s wait timer and all other functions. So in summary the 2s timer and the 5s timer run simultaneously. The 5s timer is reset every time at 3s if you are still in the coffin. If you aren't anymore, then the 5s will run out, resetting everything.

Or even more simple:

- 30s timer for the warp
- Every 5s the 30s timer is reset
- Every 2s the 5s timer is reset if you are in the coffin.

So this means the player can get constantly in and out of the coffin and the 30s timer will count down as if you are in the coffin the entire time.

Additionally, Function 2 uses an elapsed time conditional which counts down from 2s into the negative until you go into the coffin. Technically it might be possible to underflow this timer to a massive positive number, meaning the 5s timer will always be allowed to run out, resetting the 30s timer each time. This would prevent the coffin warp from working entirely until a reload if the player hasn't warped with the coffin prior.

## Offering A Lord Soul More Than Once

Offering a Lord Soul sets flag 756 to true in the ESD of the Lordvessel.

Event script function 11800200 listens for flag 756 to be set and plays the offering animation. Then it checks for each Lord Soul if you own it and haven't offered it yet. If yes, for any Lord Soul you own it will set the flag that you offered it and remove it from your inventory. Then flag 756 is unset again (but only if a new Lord Soul was offered).

This works normally if you can only acquire a Lord Soul once. However, by abusing **[Drop Swap](/darksouls/drop-swap)** and the Firelink Chest you can acquire them more than once.

If a Lord Soul is offered a second time, the above function plays again, but does not conclude because no new Lord Soul is offered. Thus flag 756 stays set and every time the Kiln map is loaded anew, the offering animation will play. If the player acquires a new Lord Soul the function will resume like normal and the character will play the sitting at the bonfire animation.

This allows for the Kiln door opening cutscene to be played in Firelink/Abyss. E.g. you could get all Lord Souls except Four Kings and dupe one, offer your 3 Lord Souls and then additionally offer the duped one, which will set 756 but not unset it. Then dropping into the Abyss will cause the offering animation to play. Killing 4 Kings at this point and acquiring their Lord Soul will instantly trigger the cutscene to open the Kiln door.

## Oscar Skip

- **Variant 1:** Flee the first Asylum Demon encounter, go through a load screen (quitout, darksign), open the shortcut door down to the courtyard and enter the Asylum arena through the door like normal (there will be 2 action prompts, one of which allows you to open the door). Kill the Asylum Demon and leave the Asylum.\
  → **Explanation:** The action prompt which allows you to open the door is removed when the Asylum fight is fled but reappears on reload and needs to be disabled again. However, this only happens if the shortcut door has been opened and the game has afterwards been reloaded. As such, reloading the game and only then opening the shortcut door allows the arena door to still be opened.

* **Variant 2 (NG+ only):** Poison/Toxic Asylum Demon, then flee the fight and traverse the small foggate before Oscar. Wait for Asylum Demon to die and you will receive the Big Pilgrim's Key, and the door to the Asylum arena will open. Go down through the shortcut door and leave the Asylum.\
  → **Explanation:** The game considers the Asylum Demon fight to be the first encounter as long as the small foggate before Oscar is intact. Once it's removed, Asylum Demon dying will grant you the Big Pilgrim's Key. Via poison/toxic, Asylum Demon can be killed at this point without talking to Oscar and going up the stairs.

## Asylum Demon Skip

In Function 11810300 the game checks for Asylum Demon's HP to be reduced to 0 on the first encounter (more specifically, as long as the small foggate before Oscar is intact). Once that occurs, the game prevents Asylum Demon from dropping the Big Pilgrim's Key and instead Oscar will give it to you.\
However, reducing a boss' HP to 0 does not equal to the boss being dead. If Asylum Demon's HP is reduced to 0 on the first encounter and the player then quits out or uses the darksign, Asylum Demon won't die but Oscar will still grant the player the Big Pilgrim's Key. This allows to leave the Asylum without Asylum Demon having been killed.

## Ornstein & Smough Death Handling

Event Function 11515396 handles the spawning of Super Ornstein and Super Smough.\
Summarized procedure:

**1.** Wait for the death of either Ornstein (Event ID: 01510800) or Smough (Event ID: 01510810).\
**2.** Once at least one is dead, check if Smough is dead. If yes, give Super Ornstein.\
**3.** If Smough is not dead, give Super Smough.

Thus, if both die on the same frame, you will get Super Ornstein as Smough's death is the deciding factor for who spawns.

## Placing Lordvessel For Kaathe & Frampt At Once

The Lordvessel must be acquired and both Bells of Awakening must be rung as normal, and 4 Kings killed to unlock both Frampt and Kaathe.

Then Kaathe's warp must be stored. This can be achieved by warping out of the Abyss so that Kaathe's warp dialogue ends during the warp fadeout. Warping out in this way can be achieved by choosing Kaathe's warp option while warping out from the bonfire (shown in the video **[here](//www.youtube.com/watch?v=vRor2yiJbQ4)**).\
Doing so will set flag 821 to true. With this flag set, setting foot on New Londo Ruins/Valley of Drakes/The Abyss (map 16_0) will trigger Kaathe's warp.

With flag 821 set, go to Frampt in Firelink and let him take you down to the Altar. Then simply bone back to the Abyss and Kaathe's warp will take you to the Kiln again, and both Frampt and Kaathe will be present. Placing the Lordvessel at this point will keep them both friendly.

The oddity here is why is Frampt not disabled when the Kaathe warp happens and the Kiln map is reloaded? This is because the flags that keep Frampt and Kaathe enabled in the Kiln (830 and 831 respectively) are only unset if the player is outside of the Kiln map and 0.5s elapse (Functions 822 and 823 in common.emevd). Since the stored Kaathe warp is instantly triggered when the player warps back to the Abyss, Frampt's flag 830 has no chance to be unset, thus keeping Frampt in the Kiln.

## Disabling Priscilla

Priscilla can be disabled without actually successfully killing her by reducing her HP to 0 then quitting out before you receive the boss victory. Afterwards, the foggate and boss music will still be there, but Priscilla will be gone. The Painted World can be left like normal.\
This occurs because a function (11100531) listens for Priscilla's death in order to set the flags related to her NPC state appropriately. However, this was implemented by checking for her HP to be equal or less than 0 instead of checking for her actually being dead. Thus the function is allowed to conclude without Priscilla being actually dead. The reason she is afterwards disabled is because that same function will disable Priscilla if the function has concluded once before. This is due to Priscilla actually being two actors, and the NPC version of Priscilla needs to be disabled separately to the boss version. With Priscilla thus disabled on every reload, she cannot any longer be defeated as a boss.

## Increasing The NG Counter Continuously In One Playthrough

At the end of the game after Gwyn is defeated the player can continuously increase the NG counter by walking out of the arena to trigger the Dark Lord ending and simultaneously quitting out. This is due to the fact that the function handling this action (Function 21) is scripted to increase the NG counter and only then play the Dark Lord cutscene (and to afterwards set flag 21 which triggers the credits). Since quitting out as the cutscene is triggered will respawn the player back in Gwyn's arena, this can be done over and over again to keep increasing the NG counter without starting a new NG cycle.

## Firelink Chest Duping

The chest behind Frampt in Firelink is used to give the player any Key item or item crucial for the completion of the game should the player no longer have them in their inventory despite still potentially needing them.

This is accomplished by an Event Script Function in Firelink that checks flags (on Firelink load) whether the player should have any given item. If the player doesn't, the function adds it to the chest as an item pickup. This can be abused even without any glitches to for example acquire the Covenant of Artorias ring multiple times. By dropping it in an area adjacent to Firelink (e.g. Undead Burg) while Firelink is not loaded, then loading Firelink, the ring will be put in the chest, ready to be picked up. By then picking up the dropped ring without again unloading Firelink, or picking up the ring in Firelink first and then going back to pick up the dropped ring, you can dupe the ring.

This method can be used for any item that spawns in the chest. Normally Key items and such cannot be dropped, but with **[Drop Swap](/darksouls/drop-swap)** they can be. This isn't very useful though as Key items can only be held in the inventory a single time. As such, trying to pick them up in the chest while having the Key already in the inventory will result in the item from the chest to be dropped on the ground again instantly.

## Opening Some One-sided Doors From The "Wrong" Side

Certain doors in the game with a "Does not open from this side" prompt are implemented in a certain way that allows this restriction to be circumvented using a riposte. The doors in question are the door leading to Lower Undead Burg, three doors in the Anor Londo cathedral, and the shortcut door leading from Oscar to the courtyard in the Undead Asylum.

The way these doors are implemented is that they may only be opened if the player has the SpEffect 4150 active on them. This effect lasts for three seconds and has no use other than being used to check whether you may open the doors. If the player has the effect active, they may open the doors (from any side); if they don't, they may not.

SpEffect 4150 is applied when the player's position is within a defined region on the correct side of the door. After it is applied, the corresponding function is halted for three seconds and is restarted to reapply the SpEffect. As mentioned, the effect lasts three seconds and as such the effect is always active on the correct side of the door.

However, the player can abuse the riposte animation from the "wrong" side of the door to barely reach over to the other side to activate the SpEffect without actually needing to walk all the way around to access the other side. Since the effect lasts three seconds, you can complete the riposte animation and still have enough time to open the door afterwards. Care must be taken that the SpEffect is applied as late as possible into the riposte animation, otherwise it will run out before the player is able to interact with the door again. An example video for the door leading to Lower Undead Burg may be found [**here**](//youtu.be/v20FnL1FCq8).

## Various Oddities

- If the player or an NPC are ported out of ESD range during dialogue, the player will be unable to do anything they can't do during dialogue (e.g. use confirmation box items, talk to other NPCs, ...) until a reload or the player reenters that NPC's ESD range.
- An NPC can become aggro'd without any menu being closed by poisoning them and bringing them below 90% HP while the menu is open.
- If a bonfire menu and an NPC menu is active at the same time ("resting while talking"), then normally unaccessable menu options of one menu may be accessed through the other by choosing an option with the respective index.
