 		<!-- across descriptor -->
 		<?php
 		$mass = 'header-top.php product.php about.php news.php footer.php';
 		$res = explode(' ', $mass);

 		$file1 = fopen('../index.php', 'w');
 		fwrite($file1, "<?php require_once('includes/header.php'); ?>\n");

 		for($i = 0; $i < count($res); $i++){
 		echo `touch $res[$i]`;
 		fwrite($file1, "<?php require_once('includes/$res[$i]'); ?>"."\n");
 		}
 		fwrite($file1, "\n</body>\n</html>");
 		fclose($file1);
 		$file2 = fopen('../js/fonts.js', 'w');
 		fwrite($file2, "
 		// $(document).ready(function() {
 		// 	$(\"head\").append('<link href=\"https://fonts.googleapis.com/css?family=PT+Sans&amp;subset=cyrillic\" rel=\"stylesheet\">');
 		// 	$(\"head\").append(\"<link href='//netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.css' rel='stylesheet'>\");
 		// }); 
 		");
 		fclose($file2);
 		$file3 = fopen('footer.php', 'w');
 		fwrite($file3, "
 		<!-- JS_BLOCK -->
 		<script src=\"libs/jquery/jquery-1.11.1.min.js\"></script>
 		<script src=\"libs/owl.carousel/owl.carousel.js\"></script>
 		<script src=\"libs/fancybox/jquery.fancybox.pack.js\"></script>
 		<script type=\"text/javascript\" src=\"js/jquery.mousewheel.js\"></script>
 		<script src=\"js/responsiveTabs.js\"></script>
 		<script src=\"js/jquery.maskedinput.min.js\"></script>
 		<script src=\"js/fonts.js\"></script>
 		<script src=\"js/common.js\"></script>
 		");
 		fclose($file3);
 		?>

 		
