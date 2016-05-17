using UnityEngine;
using System.Collections;

public class RandomPlanets : MonoBehaviour
{
	public int _planetCount = 4;
	public float _minRadius = 1000;
	public float _maxRadius = 10000;
	public Texture2D[] _textures;
	public Texture2D[] _waterTextures;
	public Texture2D[] _waterNormals;

	public float _waterProbability = 0.6f;
	public bool _enablePhysics = false;

	private CPlanet[] _planets;


	void Start()
	{
		GameObject gl = new GameObject("sun");
		Light l = gl.AddComponent<Light>();
		l.type = LightType.Point;
		l.range = _planetCount * _maxRadius;
		l.transform.position = Vector3.zero;

		float dist = 5000 + _maxRadius * 2;

		for (int c = 0; c < _planetCount; c++)
		{
			GameObject obj = new GameObject();
			obj.name = "Ethereal Planet";
			// Font ArialFont = (Font)Resources.GetBuiltinResource (typeof(Font), "Bangers.ttf");
			CPlanet p = obj.AddComponent<CPlanet>();
			obj.AddComponent<TextMesh>();
			obj.GetComponent<TextMesh>().color = Color.white;
			// obj.GetComponent<TextMesh>().font = ArialFont;
			obj.GetComponent<TextMesh>().characterSize = 4;
			obj.GetComponent<TextMesh>().fontSize = 500;

			obj.AddComponent<TextJSONUpdate>();
			p.layers = new CNoiseLayer[]
			{
				new CNoiseLayer(NoiseLayerType.Turbulence, new Vector3(Random.value*128, Random.value*128, Random.value*128), 8, Random.Range(0.53f, 0.58f), Random.Range(2.5f, 4.0f), Random.Range(-0.0f, 0.0f), Random.Range(1.9f, 2.1f), 0.4f),
				new CNoiseLayer(NoiseLayerType.Ridged, new Vector3(Random.value, Random.value, Random.value), 8, Random.Range(0.53f, 0.56f), Random.Range(2.0f, 5.0f), Random.Range(-0.05f, 0.05f), Random.Range(1.9f, 2.2f), 0.4f),
			};

			p.m_Radius = Random.Range(_minRadius, _maxRadius);
			p.m_HeightScale = Random.Range(0.025f, 0.035f) * p.m_Radius;
			p.m_HeightPower = 0; // Random.Range(0, 2);
			p.m_MaxSplitLevel = 9;

			p.m_NormalQuality = en_NormalQuality.Standard;
			p.m_PatchQuality = en_PatchQuality.High;
			p.m_NormalMultiplier = 2;

			p.m_SizeSplit = 3;
			p.m_SizeRejoin = 6;

			Vector3 pos = Random.onUnitSphere;
			pos *= dist;
			p.transform.position = pos;

			p.m_BaseTex = _textures[Random.Range(0, _textures.Length)];
			p.m_BaseTexTile = (int)Random.Range(512, 1024);

			p.m_Diffuse1Tex = _textures[Random.Range(0, _textures.Length)];
			p.m_Diffuse1TexTile = (int)Random.Range(1024, 2048);
			p.m_Diffuse1LutLayer.minh = 0;
			p.m_Diffuse1LutLayer.maxh = 2;
			p.m_Diffuse1LutLayer.slope = 0.0f;
			p.m_Diffuse1LutLayer.aperture = 0.15f;

			p.m_Diffuse2Tex = _textures[Random.Range(0, _textures.Length)];
			p.m_Diffuse2TexTile = (int)Random.Range(1024, 2048);
			p.m_Diffuse2LutLayer.aperture = 0.4f;
			p.m_Diffuse2LutLayer.minh = 0;
			p.m_Diffuse2LutLayer.maxh = 2;
			p.m_Diffuse2LutLayer.slope = 0.6f;

			if (Random.value < _waterProbability)
			{
				p.m_WaterLevel = Random.Range(-0.1f, 0.1f);
				p.m_WaterTex = _waterTextures[Random.Range(0, _waterTextures.Length)];
				p.m_WaterNormalTex = _waterNormals[Random.Range(0, _waterNormals.Length)];
				p.m_WaterTexTile = 10240;
				p.m_WaterNormalTile = 4096;
				p.m_WaterTexColor = new Color(Random.value, Random.value, Random.value, .1f);
				p.m_HasAtmosphere = true;
			}
			else
			{
				p.m_HeightScale *= 2;
				p.m_WaterLevel = -256;
				p.m_HasAtmosphere = false;
			}

			p.m_SunTransform = l.transform;
			p.m_EnablePhysics = _enablePhysics;
			p.m_AtmosScale = 1.2f;

			dist += _maxRadius * 2;
		}
	}
}
