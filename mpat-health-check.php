<?php
/**
* Plugin Name: MPAT Health Check
* Plugin URI: https://github.com/jeanphilipperuijs/mpat-health-check
* Description: Checks the health of your WordPress install.
* Author: Jean-Philippe Ruijs
* Version: 1.0.0
* Author URI: https://github.com/jeanphilipperuijs/mpat-health-check
* Text Domain: mpat-health-check
*/

if (! defined('ABSPATH')) {
    die('We\'re sorry, but you can not directly access this file.');
}

define('MPAT_CHECK_PHP_MIN_VERSION', '5.2.4');
define('MPAT_CHECK_PHP_REC_VERSION', '7.0');
define('MPAT_CHECK_MYSQL_MIN_VERSION', '5.0');
define('MPAT_CHECK_MYSQL_REC_VERSION', '5.6');
define('MPAT_CHECK_PLUGIN_VERSION', '0.5.0');

class HealthCheck
{

    public function __construct()
    {
        $this->init();
    }

    public function init()
    {
        add_action('plugins_loaded', array($this, 'load_i18n'));
        add_action('admin_menu', array($this, 'action_admin_menu'));
        add_filter('plugin_row_meta', array($this, 'settings_link'), 10, 2);
        add_action('admin_enqueue_scripts', array($this, 'enqueues'));
    }
    
    function action_admin_notices()
    {
        echo '<div class="message updated"><p>' . __( 'Loaded', 'mpat-health-check' ) . '</p></div>';
    }
    public function load_i18n()
    {
        load_plugin_textdomain('mpat-health-check', false, basename(dirname(__FILE__)) . '/languages/');
    }

    public function enqueues()
    {
        // Don't enqueue anything unless we're on the health check page
        if (! isset($_GET['page']) || 'mpat-health-check' !== $_GET['page']) {
            return;
        }

        wp_enqueue_script('wp-api');

        wp_localize_script('wp-api', 'plugins', get_plugins());
        wp_localize_script('wp-api', 'themes', wp_get_themes());
        wp_localize_script('wp-api', 'debugInfo', MPAT_CHECK_Debug_Data::debug_data());
        
        wp_localize_script('wp-api', 'i18n', array(
            'pages' => esc_html__('Pages', 'mpat-health-check'),
            'layouts' => esc_html__('Layouts', 'mpat-health-check'),
            'models' => esc_html__('Models', 'mpat-health-check'),
            'options' => esc_html__('Options', 'mpat-health-check'),
            'plugins' => esc_html__('Plugins', 'mpat-health-check'),
            'themes' => esc_html__('Themes', 'mpat-health-check'),
            'yes' => esc_html__('Yes', 'mpat-health-check'),
            'no' => esc_html__('No', 'mpat-health-check'),
            'hostOK' => esc_html__('Is correctly hosted', 'mpat-health-check'),
            'debug' => esc_html__('Debug', 'mpat-health-check'),
            
        ));
        
        wp_enqueue_script('mpat-hc', plugin_dir_url(__FILE__) . 'public/rui.js', array('wp-api'), 1.0, true);
    //	wp_enqueue_script('mpat-hc', 'http://localhost:8000/rui.js', array('wp-api'), 1.0, true);
        
        wp_enqueue_style('mpat-health-check', plugins_url('/assets/css/health-check.css', __FILE__), array(), MPAT_CHECK_PLUGIN_VERSION);

        wp_enqueue_script('mpat-health-check', plugins_url('/assets/javascript/health-check.js', __FILE__), array('jquery'), MPAT_CHECK_PLUGIN_VERSION, true);
    }

    public function action_admin_menu()
    {
        add_dashboard_page(__('MPAT Health Check', 'mpat-health-check'), __('MPAT Health Check', 'mpat-health-check'), 'manage_options', 'mpat-health-check', array($this, 'dashboard_page'));
    }

    public function settings_link($meta, $name)
    {
        if (plugin_basename(__FILE__) === $name) {
            $meta[] = sprintf('<a href="%s" target="_blank">' . __('MPAT Health Check', 'mpat-health-check') . '</a>', menu_page_url('mpat-health-check', false));
        }

        return $meta;
    }

    public function dashboard_page()
    {
        ?>
        <div class="wrap">
            <h1>
                <?php _e('MPAT Health Check', 'mpat-health-check'); ?>
            </h1>

            <?php
            $tabs = array(
                'mpat' => esc_html__('Integrity', 'mpat-health-check'),
                /*'mpat-health-check' => esc_html__('MPAT Health Check', 'mpat-health-check'), */
            //	'debug' => esc_html__('Debug information', 'mpat-health-check')
                /*,
				'phpinfo' => esc_html__('PHP Information', 'mpat-health-check')*/
            );

            $current_tab = (isset($_GET['tab']) ? $_GET['tab'] : 'mpat-health-check');
            ?>

            <h2 class="nav-tab-wrapper wp-clearfix">
                <?php
                foreach ($tabs as $tab => $label) {
                    printf(
                        '<a href="%s" class="nav-tab %s">%s</a>',
                        sprintf(
                            '%s&tab=%s',
                            menu_page_url('mpat-health-check', false),
                            $tab
                        ),
                        ($current_tab === $tab ? 'nav-tab-active' : ''),
                        $label
                    );
                }
                ?>
            </h2>
                <div id="loader">
                <blockquote>
                        <?php _e('Loading...', 'mpat-health-check') ?>
                    </blockquote>
                <!--   
                    <img src="<?php echo plugins_url('/assets/loading.gif', __FILE__);?>" />
				-->
                </div>
            <?php
            switch ($current_tab) {
                case 'mpat':
                    include_once(dirname(__FILE__) . '/pages/mpat.php');
                    break;
                default:
                    include_once(dirname(__FILE__) . '/pages/mpat.php');
            }
            ?>
        </div>
        <?php
    }

    static function json_check()
    {
        $extension_loaded = extension_loaded('json');
        $functions_exist = function_exists('json_encode') && function_exists('json_decode');
        $functions_work = function_exists('json_encode') && ('' != json_encode('my test string'));

        return $extension_loaded && $functions_exist && $functions_work;
    }
}

/* Initialize ourselves */
new HealthCheck();

require_once(dirname(__FILE__) . '/includes/data.php');
