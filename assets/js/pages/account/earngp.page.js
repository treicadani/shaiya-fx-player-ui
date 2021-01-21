parasails.registerPage('earngp', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
  
      // For <ajax-form>
      formData: { /* … */ },
      formRules: { /* … */ },
      formErrors: { /* … */ },
      cloudError: '',
      syncing: '',
  
      // For <modal>:
      modal: '',
  
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function (){
      _.extend(this, window.SAILS_LOCALS);
  
      var sectors = [
        {color:"#f82", label:"Stack"},
        {color:"#0bf", label:"10"},
        {color:"#fb0", label:"200"},
        {color:"#0fb", label:"50"},
        {color:"#b0f", label:"100"},
        {color:"#f0b", label:"5"},
        {color:"#bf0", label:"500"},
      ];
      
      var rand = (m, M) => Math.random() * (M - m) + m;
      var tot = sectors.length;
      var EL_spin = document.querySelector("#spin");
      var ctx = document.querySelector("#wheel").getContext('2d');
      var dia = ctx.canvas.width;
      var rad = dia / 2;
      var PI = Math.PI;
      var TAU = 2 * PI;
      var arc = TAU / sectors.length;
      
      var friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
      var angVel = 0; // Angular velocity
      var ang = 0; // Angle in radians
      
      var getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;
      
      function drawSector(sector, i) {
        var ang = arc * i;
        ctx.save();
        // COLOR
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, ang, ang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        // TEXT
        ctx.translate(rad, rad);
        ctx.rotate(ang + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 30px sans-serif";
        ctx.fillText(sector.label, rad - 10, 10);
        //
        ctx.restore();
      };
      
      function rotate() {
        var sector = sectors[getIndex()];
        ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
        EL_spin.textContent = !angVel ? "SPIN" : sector.label;
        EL_spin.style.background = sector.color;
      }
      
      function frame() {
        if (!angVel) return;
        angVel *= friction; // Decrement velocity by friction
        if (angVel < 0.002) angVel = 0; // Bring to stop
        ang += angVel; // Update angle
        ang %= TAU; // Normalize angle
        rotate();
      }
      
      function engine() {
        frame();
        requestAnimationFrame(engine)
      }
      
      // INIT
      sectors.forEach(drawSector);
      rotate(); // Initial rotation
      engine(); // Start engine
      EL_spin.addEventListener("click", () => {
        if (!angVel) angVel = rand(0.25, 0.35);
      });
    },
    mounted: async function() {
      //…
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
  
      
  
    }
  });
  