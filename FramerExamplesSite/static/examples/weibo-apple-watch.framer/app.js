/* Made with Framer
by Li Jingyuan
www.framerjs.com */

/* 装载手表图片文件
Define watch */
var click, easeout, fade, follow_button, launch, mask, message_button, psd, recording, textStyle1, textStyle2, watch;

watch = new Layer({
  width: 480,
  height: 824,
  image: "images/watch.png",
  scale: 0.8
});

watch.center();

/* 设置屏幕蒙板
Set screen mask */

mask = new Layer({
  width: 300,
  height: 360,
  backgroundColor: "transparent",
  superLayer: watch
});

mask.center();

/* 装载界面源文件
Import interface elements */

psd = Framer.Importer.load("imported/screenfiles");

psd.group.superLayer = mask;

/* 装载录音视频文件
Load the recording video */

recording = new VideoLayer({
  video: "images/screen.mp4"
});

recording.width = 300;

recording.height = 360;

recording.opacity = 0;

recording.superLayer = mask;

recording.visible = false;

/* 设置工具栏
Set toolbar */

textStyle1 = {
  "font-size": "13px",
  "font-weight": "600",
  "text-align": "center",
  "line-height": "32px",
  "color": "#444"
};

textStyle2 = {
  "font-size": "24px",
  "font-weight": "100",
  "text-align": "center",
  "line-height": "60px",
  "color": "#333333"
};

message_button = new Layer({
  width: 120,
  height: 32,
  y: 10,
  backgroundColor: "#fff"
});

message_button.html = "New Message";

message_button.style = textStyle1;

message_button.style.borderRadius = "4px";

message_button.style.boxShadow = "inset 0 0 0 2px rgba(0,0,0,.1)";

message_button.opacity = 0;

message_button.visible = false;

follow_button = new Layer({
  width: 100,
  height: 32,
  y: 48,
  backgroundColor: "#fff"
});

follow_button.html = "New Friend";

follow_button.style = textStyle1;

follow_button.style.borderRadius = "4px";

follow_button.style.boxShadow = "inset 0 0 0 2px rgba(0,0,0,.1)";

follow_button.opacity = 0;

follow_button.visible = false;

message_button.centerX();

follow_button.centerX();

window.onresize = function() {
  watch.center();
  message_button.centerX();
  return follow_button.centerX();
};

/* 设置UI初始状态
Set the initial state UI
Follow */

psd.follow_avatar.opacity = 0;

psd.follow_avatar.scale = 0;

psd.follow_user.opacity = 0;

psd.follow_user.scale = 0.6;

psd.follow_user.y = 160;

psd.button_follow.opacity = 0;

psd.button_follow.scale = 0.6;

psd.button_follow.y = 180;

psd.follow_h.opacity = 0;

psd.close.opacity = 0;

psd.close_h.opacity = 0;

psd.follow.visible = false;

/* Message */

psd.m_avatar.opacity = 0;

psd.m_avatar.x = 90;

psd.m_avatar.y = -90;

psd.m_content.x = -100;

psd.m_content.y = -100;

psd.m_content.opacity = 0;

psd.m_content.scale = 0.001;

psd.m_hi.opacity = 0;

psd.message.visible = false;

/* Shade_b */

psd.shade_b.opacity = 0;

psd.shade_b.visible = false;

/* Shade */

psd.shade.opacity = 0;

psd.shade.visible = false;

/* Compose */

psd.compose.x = 240;

psd.compose_icon.x = 300;

psd.compose_words.x = 300;

psd.compose.height = 296;

psd.compose.opacity = 0;

psd.compose.draggable.enabled = true;

psd.compose.draggable.speedY = 0;

psd.compose.visible = false;

/* Feed */

psd.b_content.opacity = 0;

psd.b_content.x = 0;

psd.b_name.opacity = 0;

psd.b_name.x = 0;

psd.b_icon_like.opacity = 0;

psd.b_icon_like.x = 236;

psd.c_content.opacity = 0;

psd.c_content.x = 0;

psd.c_name.opacity = 0;

psd.c_name.x = 0;

psd.c_icon_like.opacity = 0;

psd.c_icon_like.x = 236;

psd.feed_a.draggable.speedX = 0;

psd.feed_b.draggable.speedX = 0;

psd.feed_c.draggable.speedX = 0;

psd.feed_b.y = 360;

psd.feed_c.y = 360;

psd.feed.opacity = 0;

psd.feed.visible = false;

/* Splash */

psd.splash_avatar.opacity = 0;

psd.splash_avatar.y = 90;

psd.splash.scale = 0;

psd.splash.opacity = 0;

psd.splash.visible = false;

/* 设置通用动画曲线 Set animation curves */

Framer.Defaults.Animation = {
  curve: "spring(260,20,0)"
};

click = "spring(300,10,0)";

fade = "spring(200,10,0)";

easeout = "spring(320,26,0)";

launch = "spring(120,18,0)";

/* 事件 Events
启动icon Start Icon */

psd.launch_icon.on(Events.TouchStart, function() {
  return psd.launch_icon.animate({
    properties: {
      scale: 0.9
    },
    curve: click
  });
});

psd.launch_icon.on(Events.TouchEnd, function() {
  psd.desktop.animate({
    properties: {
      scale: 3,
      opacity: 0
    },
    curve: launch
  });
  psd.splash.visible = true;
  psd.splash.animate({
    properties: {
      opacity: 1,
      scale: 1
    },
    curve: launch
  });
  psd.splash_avatar.animate({
    properties: {
      y: 76
    },
    curve: fade,
    delay: 0.8
  });
  psd.splash_avatar.animate({
    properties: {
      opacity: 1
    },
    time: 0.3,
    delay: 0.8
  });
  psd.splash.on(Events.AnimationStop, function() {
    psd.feed.visible = true;
    psd.feed.animate({
      properties: {
        opacity: 1
      },
      time: 0.3,
      delay: 1.4
    });
    message_button.visible = true;
    message_button.animate({
      properties: {
        opacity: 1
      },
      time: 0.3,
      delay: 1.4
    });
    follow_button.visible = true;
    return follow_button.animate({
      properties: {
        opacity: 1
      },
      time: 0.3,
      delay: 1.4
    });
  });
  return psd.feed.on(Events.AnimationStop, function() {
    psd.feed_a.draggable.enabled = true;
    psd.feed_b.draggable.enabled = true;
    psd.feed_c.draggable.enabled = true;
    psd.compose.visible = true;
    psd.splash.visible = false;
    return psd.desktop.visible = false;
  });
});

/* feed滑动 Feed Slide
图片1，开始拖拽：下拉则移动速率降至1/4；上推则随Y轴位置模糊和缩小
Picture 1: reduce dragging speed & blur on drag */

psd.feed_a.on(Events.DragMove, function() {
  psd.feed_a.blur = psd.feed_a.y * -0.04;
  psd.feed_b.y = psd.feed_a.y + 360;
  if (psd.feed_a.y > 0) {
    return psd.feed_a.y = psd.feed_a.y / 4;
  } else {
    psd.feed_a.scale = 1 + (psd.feed_a.y * 0.0003);
    return psd.feed_a.y = psd.feed_a.y / 2;
  }
});

/* 图片1，结束拖拽：下拉则返回原位；上推则移至图片2  
Picture 1: on DragEnd, return picture to position */

psd.feed_a.on(Events.DragEnd, function() {
  psd.b_content.x = 0;
  psd.b_content.opacity = 0;
  psd.b_name.x = 0;
  psd.b_name.opacity = 0;
  psd.b_icon_like.x = 236;
  psd.b_icon_like.opacity = 0;
  if (-40 <= psd.feed_a.y) {
    psd.feed_a.animate({
      properties: {
        y: 0
      },
      curve: easeout
    });
    psd.feed_a.blur = 0;
    psd.feed_b.animate({
      properties: {
        y: 360
      },
      curve: easeout
    });
    return psd.feed_c.y = 360;
  } else {
    psd.feed_a.animate({
      properties: {
        y: -360
      },
      curve: easeout
    });
    psd.b_content.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.1
    });
    psd.b_name.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.2
    });
    psd.b_icon_like.animate({
      properties: {
        x: 252,
        opacity: 1
      },
      curve: easeout,
      delay: 0.3
    });
    return psd.feed_b.animate({
      properties: {
        y: 0
      },
      curve: easeout
    });
  }
});

/* 图片2，开始拖拽：上推则图片2模糊并缩小；下拉则图片一清楚并放大
Picture 2: on drag, push the two blurred images, then present sharp picture */

psd.feed_b.on(Events.DragMove, function() {
  psd.feed_b.blur = psd.feed_b.y * -0.04;
  if (psd.feed_b.y > 0) {
    psd.feed_a.y = psd.feed_b.y - 360;
    psd.feed_a.blur = psd.feed_a.y * -0.04;
    psd.feed_a.scale = 1 + (psd.feed_a.y * 0.0003);
    return psd.feed_a.y = psd.feed_a.y / 2;
  } else {
    psd.feed_c.y = psd.feed_b.y + 360;
    psd.feed_b.scale = 1 + (psd.feed_b.y * 0.0003);
    return psd.feed_b.y = psd.feed_b.y / 2;
  }
});

/* 图片2，结束拖拽：下拉则返回图片1；上推则跳至图片3
Picture 2: on DragEnd, the drop-down returns Picture 1 & skips Picture 3 */

psd.feed_b.on(Events.DragEnd, function() {
  var ref;
  psd.a_content.x = 0;
  psd.a_content.opacity = 0;
  psd.a_name.x = 0;
  psd.a_name.opacity = 0;
  psd.a_icon_like.x = 236;
  psd.a_icon_like.opacity = 0;
  psd.c_content.x = 0;
  psd.c_content.opacity = 0;
  psd.c_name.x = 0;
  psd.c_name.opacity = 0;
  psd.c_icon_like.x = 236;
  psd.c_icon_like.opacity = 0;
  if ((-40 <= (ref = psd.feed_b.y) && ref <= 40)) {
    psd.feed_b.animate({
      properties: {
        y: 0
      },
      curve: easeout
    });
    psd.feed_b.blur = 0;
    psd.feed_c.animate({
      properties: {
        y: 360
      },
      curve: easeout
    });
  }
  if (psd.feed_b.y > 40) {
    psd.feed_b.animate({
      properties: {
        y: 360,
        blur: 0
      },
      curve: easeout
    });
    psd.a_content.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.1
    });
    psd.a_name.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.2
    });
    psd.a_icon_like.animate({
      properties: {
        x: 252,
        opacity: 1
      },
      curve: easeout,
      delay: 0.3
    });
    psd.feed_a.animate({
      properties: {
        y: 0,
        blur: 0,
        scale: 1
      },
      curve: easeout
    });
    psd.feed_c.y = 360;
  }
  if (psd.feed_b.y < -40) {
    psd.feed_b.animate({
      properties: {
        y: -360
      },
      curve: easeout
    });
    psd.c_content.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.1
    });
    psd.c_name.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.2
    });
    psd.c_icon_like.animate({
      properties: {
        x: 252,
        opacity: 1
      },
      curve: easeout,
      delay: 0.3
    });
    return psd.feed_c.animate({
      properties: {
        y: 0
      },
      curve: easeout
    });
  }
});

/* 图片3，开始拖拽：下拉则随Y轴位置模糊和缩小；上推则移动速率降至1/4
Picture 3: reduce dragging speed & blur on drag */

psd.feed_c.on(Events.DragMove, function() {
  psd.feed_b.y = psd.feed_c.y - 360;
  if (psd.feed_c.y > 0) {
    psd.feed_b.blur = psd.feed_b.y * -0.04;
    psd.feed_b.scale = 1 + (psd.feed_b.y * 0.0003);
    return psd.feed_b.y = psd.feed_b.y / 2;
  } else {
    return psd.feed_c.y = psd.feed_c.y / 4;
  }
});

/* 图片3，结束拖拽：下拉则返回图片2；上推则返回原位
Picture 3: on DragEnd, stay in view or return to Picture 2 */

psd.feed_c.on(Events.DragEnd, function() {
  psd.b_content.x = 0;
  psd.b_content.opacity = 0;
  psd.b_name.x = 0;
  psd.b_name.opacity = 0;
  psd.b_icon_like.x = 236;
  psd.b_icon_like.opacity = 0;
  if (psd.feed_c.y <= 40) {
    psd.feed_c.animate({
      properties: {
        y: 0
      },
      curve: easeout
    });
    return psd.feed_b.animate({
      properties: {
        y: -360
      },
      curve: easeout
    });
  } else {
    psd.feed_c.animate({
      properties: {
        y: 360
      },
      curve: easeout
    });
    psd.b_content.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.1
    });
    psd.b_name.animate({
      properties: {
        x: 16,
        opacity: 1
      },
      curve: easeout,
      delay: 0.2
    });
    psd.b_icon_like.animate({
      properties: {
        x: 252,
        opacity: 1
      },
      curve: easeout,
      delay: 0.3
    });
    return psd.feed_b.animate({
      properties: {
        y: 0,
        blur: 0,
        scale: 1
      },
      curve: easeout
    });
  }
});

/* 赞
Feed_a */

psd.a_like.states.add({
  big: {
    scale: 1,
    opacity: 1
  },
  small: {
    scale: 0,
    opacity: 0
  }
});

psd.a_liked.states.add({
  big: {
    scale: 1,
    opacity: 1
  },
  small: {
    scale: 0,
    opacity: 0
  }
});

psd.a_like.states.switchInstant("big");

psd.a_liked.states.switchInstant("small");

psd.a_icon_like.on(Events.Click, function() {
  psd.a_like.states.next("small", "big");
  return psd.a_liked.states.next("big", "small");
});

/* Feed_b */

psd.b_like.states.add({
  big: {
    scale: 1,
    opacity: 1
  },
  small: {
    scale: 0,
    opacity: 0
  }
});

psd.b_liked.states.add({
  big: {
    scale: 1,
    opacity: 1
  },
  small: {
    scale: 0,
    opacity: 0
  }
});

psd.b_like.states.switchInstant("big");

psd.b_liked.states.switchInstant("small");

psd.b_icon_like.on(Events.Click, function() {
  psd.b_like.states.next("small", "big");
  return psd.b_liked.states.next("big", "small");
});

/* Feed_c */

psd.c_like.states.add({
  big: {
    scale: 1,
    opacity: 1
  },
  small: {
    scale: 0,
    opacity: 0
  }
});

psd.c_liked.states.add({
  big: {
    scale: 1,
    opacity: 1
  },
  small: {
    scale: 0,
    opacity: 0
  }
});

psd.c_like.states.switchInstant("big");

psd.c_liked.states.switchInstant("small");

psd.c_icon_like.on(Events.Click, function() {
  psd.c_like.states.next("small", "big");
  return psd.c_liked.states.next("big", "small");
});

/* 设置compose图标 Fade in */

psd.compose.on(Events.DragMove, function() {
  psd.compose_icon.x = psd.compose.x + 39;
  psd.compose_words.x = psd.compose.x + 24;
  psd.compose_icon.opacity = (240 - psd.compose.x) * 0.01;
  psd.compose_words.opacity = (240 - psd.compose.x) * 0.01;
  return psd.feed.blur = 20 - 1 / 12 * psd.compose.x;
});

psd.compose.on(Events.DragEnd, function() {
  if (psd.compose.x > 100) {
    psd.compose.height = 296;
    psd.compose.x = 240;
    psd.feed.animate({
      properties: {
        blur: 0
      },
      time: 0.1
    });
    psd.compose_icon.animate({
      properties: {
        x: 300
      },
      time: 0.1
    });
    return psd.compose_words.animate({
      properties: {
        x: 300
      },
      time: 0.1
    });
  } else {
    psd.compose.height = 360;
    psd.compose.x = 0;
    psd.feed.animate({
      properties: {
        blur: 20
      },
      time: 0.01
    });
    psd.compose_icon.animate({
      properties: {
        x: 39,
        scale: 1
      },
      time: 0.1
    });
    return psd.compose_words.animate({
      properties: {
        x: 24
      },
      time: 0.1
    });
  }
});

/* 设置发布器点击效果
Set publisher click effect */

psd.compose.on(Events.TouchStart, function() {
  var ref;
  if ((-5 < (ref = psd.compose.x) && ref < 5)) {
    return psd.compose_icon.animate({
      properties: {
        scale: 0.9
      },
      curve: click
    });
  }
});

psd.compose.on(Events.TouchEnd, function() {
  var ref;
  if ((-5 < (ref = psd.compose.x) && ref < 5)) {
    psd.compose_icon.animate({
      properties: {
        scale: 1,
        opacity: 0
      },
      time: 0.3
    });
    recording.visible = true;
    recording.animate({
      properties: {
        opacity: 1
      },
      time: 0.3
    });
    recording.player.play();
    return recording.player.on("ended", function() {
      return recording.player.play();
    });
  }
});

/* 设置recording点击返回
Define the recording interactions */

recording.on(Events.Click, function(event) {
  recording.animate({
    properties: {
      opacity: 0
    },
    curve: easeout
  });
  recording.visible = false;
  psd.feed.animate({
    properties: {
      blur: 0
    },
    time: 0.1
  });
  psd.compose.x = 240;
  psd.compose_icon.x = 300;
  psd.compose_words.x = 300;
  psd.compose.height = 296;
  psd.compose.opacity = 0;
  if (psd.m_avatar.y >= -20) {
    message_button.visible = true;
    follow_button.visible = true;
    psd.compose.x = 240;
    psd.compose_icon.x = 300;
    psd.compose_words.x = 300;
    psd.compose.height = 296;
    psd.compose.opacity = 0;
    psd.m_avatar.opacity = 0;
    psd.m_avatar.x = 90;
    psd.m_avatar.y = -90;
    psd.m_content.x = -100;
    psd.m_content.y = -100;
    psd.m_content.opacity = 0;
    psd.m_content.scale = 0.001;
    psd.message.visible = false;
    psd.message.opacity = 0;
    psd.message.x = 18;
    message_button.animate({
      properties: {
        opacity: 1,
        y: 10,
        scaleY: 1
      },
      curve: easeout
    });
    return follow_button.animate({
      properties: {
        y: 48
      },
      curve: easeout
    });
  }
});

/* 新消息 News
新消息button点击触发 New Message button events */

message_button.on(Events.TouchStart, function() {
  if (psd.compose.x > 10) {
    message_button.animate({
      properties: {
        scale: 0.9
      },
      curve: click
    });
    return psd.m_avatar.animate({
      properties: {
        y: -90,
        opacity: 0
      },
      curve: easeout
    });
  }
});

message_button.on(Events.TouchEnd, function() {
  if (psd.compose.x > 10) {
    message_button.animate({
      properties: {
        scale: 1
      },
      curve: click
    });
    psd.message.visible = true;
    psd.message.opacity = 1;
    psd.m_avatar.animate({
      properties: {
        y: -43,
        opacity: 1
      },
      curve: easeout
    });
    psd.shade.visible = true;
    psd.feed.animate({
      properties: {
        blur: 10
      },
      time: 0.1
    });
    message_button.visible = false;
    return follow_button.visible = false;
  }
});

psd.shade.on(Events.Click, function() {
  if (psd.m_avatar.y < 0) {
    psd.m_avatar.animate({
      properties: {
        y: -90,
        opacity: 0
      },
      curve: easeout
    });
    psd.feed.animate({
      properties: {
        blur: 0
      },
      time: 0.2
    });
    psd.shade.visible = false;
    message_button.visible = true;
    return follow_button.visible = true;
  }
});

/* 新消息点击头像动画 News avatar animations */

psd.m_avatar.on(Events.TouchStart, function() {
  return psd.m_avatar.animate({
    properties: {
      scale: 0.9
    },
    curve: easeout
  });
});

psd.m_avatar.on(Events.TouchEnd, function() {
  psd.m_avatar.animate({
    properties: {
      scale: 1,
      x: 0,
      y: 0
    },
    curve: easeout
  });
  psd.m_content.animate({
    properties: {
      x: 10,
      y: 14,
      scale: 1,
      opacity: 1
    },
    curve: easeout,
    delay: 0.2
  });
  return psd.feed.animate({
    properties: {
      blur: 20
    },
    time: 0.2
  });
});

/* 新消息回复 News reply */

psd.m_button.on(Events.TouchStart, function() {
  psd.m_hi.opacity = 1;
  return psd.m_no.opacity = 0;
});

psd.m_button.on(Events.TouchEnd, function() {
  psd.m_hi.opacity = 0;
  psd.m_no.opacity = 1;
  psd.message.animate({
    properties: {
      x: -300,
      opacity: 0
    },
    curve: easeout
  });
  psd.shade.visible = false;
  psd.compose.height = 360;
  psd.compose.x = 0;
  psd.compose_icon.animate({
    properties: {
      x: 39,
      opacity: 1
    },
    curve: easeout
  });
  return psd.compose_words.animate({
    properties: {
      x: 24,
      opacity: 1
    },
    curve: easeout
  });
});

/* 新朋友button点击触发 New Friends button interactions */

follow_button.on(Events.TouchStart, function() {
  if (psd.compose.x > 10) {
    follow_button.animate({
      properties: {
        scale: 0.9
      },
      curve: click
    });
    psd.feed.animate({
      properties: {
        blur: 0
      },
      time: 0.2
    });
    psd.follow_avatar.animate({
      properties: {
        opacity: 0,
        scale: 0
      },
      curve: "spring(200,16,0)"
    });
    psd.follow_user.opacity = 0;
    psd.follow_user.scale = 0.6;
    psd.follow_user.y = 160;
    psd.button_follow.opacity = 0;
    psd.button_follow.scale = 0.6;
    psd.button_follow.y = 180;
    return psd.close.opacity = 0;
  }
});

follow_button.on(Events.TouchEnd, function() {
  if (psd.compose.x > 10) {
    follow_button.animate({
      properties: {
        scale: 1
      },
      curve: click
    });
    psd.follow.visible = true;
    psd.follow.opacity = 1;
    psd.feed.animate({
      properties: {
        blur: 20
      },
      time: 0.2
    });
    psd.follow_avatar.animate({
      properties: {
        opacity: 1,
        scale: 1
      },
      curve: "spring(200,16,0)"
    });
    psd.follow_user.animate({
      properties: {
        opacity: 1,
        scale: 1,
        y: 206
      },
      curve: "spring(300,32,0)",
      delay: 0.45
    });
    psd.button_follow.animate({
      properties: {
        opacity: 1,
        scale: 1,
        y: 260
      },
      curve: "spring(300,32,0)",
      delay: 0.5
    });
    psd.close.animate({
      properties: {
        opacity: 1
      },
      time: 0.3,
      delay: 0.45
    });
    psd.shade_b.visible = true;
    follow_button.visible = false;
    return message_button.visible = false;
  }
});

/* follow消失 Hide follow button */

psd.button_follow.on(Events.TouchStart, function() {
  psd.follow_h.opacity = 1;
  return psd.follow_n.opacity = 0;
});

psd.button_follow.on(Events.TouchEnd, function() {
  psd.follow_h.opacity = 0;
  psd.follow_n.opacity = 1;
  psd.feed.animate({
    properties: {
      blur: 0
    },
    time: 0.3
  });
  psd.follow.animate({
    properties: {
      opacity: 0
    },
    time: 0.3
  });
  psd.follow_avatar.opacity = 0;
  psd.follow_avatar.scale = 0;
  psd.follow_user.opacity = 0;
  psd.follow_user.scale = 0.6;
  psd.follow_user.y = 160;
  psd.button_follow.opacity = 0;
  psd.button_follow.scale = 0.6;
  psd.button_follow.y = 180;
  psd.close.opacity = 0;
  follow_button.visible = true;
  message_button.visible = true;
  return psd.shade_b.visible = false;
});

psd.close.on(Events.TouchStart, function() {
  psd.close_h.opacity = 1;
  return psd.close_n.opacity = 0;
});

psd.close.on(Events.TouchEnd, function() {
  psd.close_h.opacity = 0;
  psd.close_n.opacity = 1;
  psd.feed.animate({
    properties: {
      blur: 0
    },
    time: 0.3
  });
  psd.follow.animate({
    properties: {
      opacity: 0
    },
    time: 0.3
  });
  psd.follow_avatar.opacity = 0;
  psd.follow_avatar.scale = 0;
  psd.follow_user.opacity = 0;
  psd.follow_user.scale = 0.6;
  psd.follow_user.y = 160;
  psd.button_follow.opacity = 0;
  psd.button_follow.scale = 0.6;
  psd.button_follow.y = 180;
  psd.close.opacity = 0;
  follow_button.visible = true;
  message_button.visible = true;
  return psd.shade_b.visible = false;
});
