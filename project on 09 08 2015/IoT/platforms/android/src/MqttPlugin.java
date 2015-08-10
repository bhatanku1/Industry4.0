
import android.os.StrictMode;
import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Map;
public class MqttPlugin extends CordovaPlugin {

	private static final String LOG_TAG = "MqttPlugin";

	private CallbackContext pluginCallbackContext = null;
	private  String val = null;
	private final String clientID = null;
	private final String brokerUrl = null;
	private final String userName = null;
	private final String password = null;
	private String m_publishData = null;
	private String m_topic = null;

	final IKuraMQTTClient client = new KuraMQTTClient.Builder()
			.setHost("m20.cloudmqtt.com").setPort("11143")
			.setClientId("CLIENT_129787").setUsername("user@email.com")
			.setPassword("iotiwbiot").build();

	// Connect to the Message Broker
	final boolean status = client.connect();


	// args = [url, username, password, clientID, topic]
	@Override
	public boolean execute(String action,  JSONArray args,
						    final CallbackContext callbackContext) throws JSONException {
		Log.d("Kura-MQTT", String.valueOf(status));
		if (android.os.Build.VERSION.SDK_INT >= 11) {
			final StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
					.permitAll().build();
			StrictMode.setThreadPolicy(policy);
		}
		if (action.equals("subscribe")) {
			this.setOpts(args);
			Log.d("Topic in subscribe", args.get(0).toString());
			this.cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					val = subscribe();
				}
			});
			this.pluginCallbackContext = callbackContext;
			return true;
		}
		if (action.equals("heartbeat")) {
			this.setOpts(args);
			Log.d("Topic in heartbeat", args.get(0).toString());
			this.cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					heartBeat();
				}
			});
			this.pluginCallbackContext = callbackContext;
			return true;
		}
		else if (action.equals("kill")) {
			Log.d("Kura....",  args.get(0).toString());
			this.setOpts(args);
			kill();
			callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, args.get(0).toString()));

			//this.pluginCallbackContext = callbackContext;
			return true;
		}
		else if (action.equals("stop")) {
			callbackContext.success("stopped");
			return true;
		} else if (action.equals("publish")) {
			Log.d("Kura....",  args.get(0).toString());
			this.setOpts(args);
			publish();
			callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, args.get(0).toString()));

			//this.pluginCallbackContext = callbackContext;
			return true;
		}
		return false;
	}

	private void publish() {
		final KuraPayload payload = new KuraPayload();
		payload.addMetric("request.id", "55361535117");
		payload.addMetric("requester.client.id", "AMIT_083027868");
		payload.setBody(m_publishData.getBytes());
		client.publish(m_topic, payload);
	}

	private String  subscribe() {
		Log.d("subs", "Subscribe inside");
		final JSONObject object = new JSONObject();

		client.subscribe(m_topic, new MessageListener() {
			@Override
			public void processMessage(KuraPayload payload) {
				Log.d("Process", "Got the pubished message");
				final Map<String, Object> metrics = payload.metrics();
				for (final Map.Entry entry : metrics.entrySet()) {
					try {
						object.put((String) entry.getKey(), entry.getValue());
					} catch (final JSONException e) {
						e.printStackTrace();
					}

				}

				Log.d("JSON", "called subs");
				sendUpdate(object, true);
				cordova.getActivity().runOnUiThread(new Runnable() {
					@Override
					public void run() {
						try {
							//callbackContext.success(object.toString());
							Toast toast = Toast.makeText(cordova.getActivity().getApplicationContext(), object.toString(), Toast.LENGTH_LONG);
							toast.show();
							toast.setGravity(0, 1, 1);

						} catch (Exception e) {
							Log.d("Exception", e.getMessage());
						}
					}
				});

				//pluginCallbackContext.success(object.toString());
				Log.d("JSON", "called SendUpdate" + object.toString());

			}
		});
		return  object.toString();
	}
	private void heartBeat() {
		Log.d("heartbeat", " inside");
		client.subscribe(m_topic, new MessageListener() {
			@Override
			public void processMessage(KuraPayload payload) {
				Log.d("Process", "Got the pubished message");
				final JSONObject object = new JSONObject();
				final Map<String, Object> metrics = payload.metrics();
				for (final Map.Entry entry : metrics.entrySet()) {
					try {
						object.put((String) entry.getKey(), entry.getValue());
					} catch (final JSONException e) {
						e.printStackTrace();
					}
				}
				Log.d("heartbeat", "called subs from Heartbeat");
				sendUpdate(object, true);
				cordova.getActivity().runOnUiThread(new Runnable() {
					@Override
					public void run() {
						try{
							Toast toast = Toast.makeText(cordova.getActivity().getApplicationContext(), object.toString(), Toast.LENGTH_LONG);
							toast.show();
							toast.setGravity(0,1,1);

						}
						catch(Exception e)
						{
							Log.d("Exception", e.getMessage());
						}
					}
				});

				//pluginCallbackContext.success(object);
				Log.d("heartbeat", "called SendUpdate from Heartbeat" + object.toString());
			}
		});
	}

	private void kill() {
		Log.d("kill", "kill inside");
		client.subscribe(m_topic, new MessageListener() {
			@Override
			public void processMessage(KuraPayload payload) {
				Log.d("Process", "Got the kill message");
				final JSONObject object = new JSONObject();
				final Map<String, Object> metrics = payload.metrics();
				for (final Map.Entry entry : metrics.entrySet()) {
					try {
						object.put((String) entry.getKey(), entry.getValue());
					} catch (final JSONException e) {
						e.printStackTrace();
					}
				}
				Log.d("kill", "called subs");
				sendUpdate(object, true);
				cordova.getActivity().runOnUiThread(new Runnable() {
					@Override
					public void run() {
						try{
							Toast toast = Toast.makeText(cordova.getActivity().getApplicationContext(), object.toString(), Toast.LENGTH_LONG);
							toast.show();
							//toast.setGravity(0,1,1);

						}
						catch(Exception e)
						{
							Log.d("Exception", e.getMessage());
						}
					}
				});


				Log.d("kill", "called SendUpdate from Kill" + object.toString());
			}
		});
	}
	private void disconnect() {

	}

	private void sendUpdate(String info, boolean keepCallback) {
		Log.d("JSON", "insode SendUpdate");

		if (this.pluginCallbackContext != null) {
			final PluginResult result = new PluginResult(
					PluginResult.Status.OK, info);
			result.setKeepCallback(keepCallback);

			this.pluginCallbackContext.sendPluginResult(result);
		}
	}

	private void sendUpdate(JSONObject info, boolean keepCallback) {
		Log.d("In SendUpdate123", "called");

		if (this.pluginCallbackContext != null) {
			Log.d("SendUpdate", "inside the if condition");
			final PluginResult result = new PluginResult(
					PluginResult.Status.OK, info);
			Log.d("SendUpdate", "inside the second statement of if condition" + info.toString());

			try {
				//String r ;
				//r = result.getStrMessage();
				Log.d("Final subscribe", result.getStrMessage());
			}
			catch (Exception e){
				Log.d("Exceeption", e.getMessage());

			}

			result.setKeepCallback(keepCallback);

			this.pluginCallbackContext.sendPluginResult(result);
		}
	}

	public static String getStackTrace(final Throwable throwable) {
		final StringWriter sw = new StringWriter();
		final PrintWriter pw = new PrintWriter(sw, true);
		throwable.printStackTrace(pw);
		return sw.getBuffer().toString();
	}

	private void setOpts(JSONArray args) throws JSONException {
		/*
		 * this.brokerUrl = (String) args.get(0); this.userName = (String)
		 * args.get(1); this.password = (String) args.get(2); this.clientID =
		 * (String) args.get(3);
		 */
		try {
			this.m_publishData = (String) args.get(1);

		}
		catch (Exception e) {
			Log.d("subsribe", "there is no published data as it is a subscribed function");
		}
		this.m_topic = (String) args.get(0);
		Log.d("Subscribed", m_publishData+ " and " +m_topic);

	}

}